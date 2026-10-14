param([string]$Root = (Split-Path $PSScriptRoot -Parent))
$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path $Root).Path
$issues = [Collections.Generic.List[string]]::new()
$records = @()
function Attr($tag, $name) {
  $m = [regex]::Match($tag, ('\b' + $name + '\s*=\s*["'']([^"'']*)["'']'), 'IgnoreCase')
  [Net.WebUtility]::HtmlDecode($m.Groups[1].Value)
}
foreach ($file in Get-ChildItem $Root -Recurse -Filter *.html) {
  $html = [IO.File]::ReadAllText($file.FullName)
  $rel = $file.FullName.Substring($Root.Length + 1).Replace('\','/')
  $noindex = $html -match '<meta\b[^>]*content=["''][^"'']*noindex'
  $canonical = @([regex]::Matches($html,'<link\b[^>]*>','IgnoreCase') | Where-Object { (Attr $_.Value 'rel') -eq 'canonical' } | ForEach-Object { Attr $_.Value 'href' })
  $title = @([regex]::Matches($html,'<title\b[^>]*>(.*?)</title>','IgnoreCase,Singleline'))
  $desc = @([regex]::Matches($html,'<meta\b[^>]*>','IgnoreCase') | Where-Object { (Attr $_.Value 'name') -eq 'description' })
  if (!$noindex) {
    $head = [regex]::Match($html,'<head\b[^>]*>(.*?)</head>','IgnoreCase,Singleline').Groups[1].Value
    foreach ($pattern in @('<title\b','<meta\b[^>]*charset','<meta\b[^>]*name=["'']viewport')) {
      if ($head -notmatch $pattern) { $issues.Add("${rel}: head missing $pattern") }
    }
    if ($title.Count -ne 1 -or !$title[0].Groups[1].Value.Trim()) { $issues.Add("${rel}: title") }
    if ($desc.Count -ne 1 -or !(Attr $desc[0].Value 'content')) { $issues.Add("${rel}: description") }
    if ($canonical.Count -ne 1) { $issues.Add("${rel}: canonical") }
    if ([regex]::Matches($html,'<h1\b','IgnoreCase').Count -ne 1) { $issues.Add("${rel}: H1 count") }
    $schemas = [regex]::Matches($html,'<script\b[^>]*type=["'']application/ld\+json["''][^>]*>(.*?)</script>','IgnoreCase,Singleline')
    if ($schemas.Count -ne 1) { $issues.Add("${rel}: JSON-LD count") }
    foreach ($schema in $schemas) {
      try { $null = $schema.Groups[1].Value | ConvertFrom-Json } catch { $issues.Add("${rel}: invalid JSON-LD") }
    }
    $records += [pscustomobject]@{File=$rel; Title=[Net.WebUtility]::HtmlDecode($title[0].Groups[1].Value); Canonical=$canonical[0]; Description=(Attr $desc[0].Value 'content')}
  }
  foreach ($tag in [regex]::Matches($html,'<(?:a|link|script|img|source)\b[^>]*>','IgnoreCase')) {
    $ref = Attr $tag.Value 'href'; if (!$ref) { $ref = Attr $tag.Value 'src' }
    if (!$ref -or $ref -match '^(#|mailto:|tel:|javascript:|data:|//)') { continue }
    if ($ref -match '^https?://') {
      $url = [uri]$ref
      if ($url.Host -ne 'trendmakers.agency') { continue }
      $target = Join-Path $Root ([uri]::UnescapeDataString($url.AbsolutePath).TrimStart('/'))
    } else {
      $clean = [uri]::UnescapeDataString(($ref -split '[?#]')[0])
      if (!$clean) { continue }
      if ($clean.StartsWith('/')) { $target = Join-Path $Root $clean.TrimStart('/') }
      else { $target = Join-Path $file.DirectoryName $clean }
    }
    if (Test-Path -LiteralPath $target -PathType Container) { $target = Join-Path $target 'index.html' }
    if (!(Test-Path -LiteralPath $target)) { $issues.Add("${rel}: missing $ref") }
  }
}
$config = [IO.File]::ReadAllText((Join-Path $Root 'scripts/seo-pages.json')) | ConvertFrom-Json
foreach ($entry in $config) {
  foreach ($lang in @('es','en')) {
    if (!$entry.$lang) { continue }
    $file = if ($lang -eq 'en') { 'en/' + $entry.file } else { $entry.file }
    $html = [IO.File]::ReadAllText((Join-Path $Root $file))
    $record = $records | Where-Object File -eq $file
    if ($record.Title -ne $entry.$lang.title -or $record.Description -ne $entry.$lang.description) { $issues.Add("${file}: config mismatch") }
    if ($entry.en) {
      foreach ($code in @('es','en','x-default')) {
        $route = '/' + $entry.file.Replace('index.html','')
        $expected = 'https://trendmakers.agency' + $(if ($code -eq 'en') { '/en' } else { '' }) + $route
        $links = @([regex]::Matches($html,'<link\b[^>]*>','IgnoreCase') | Where-Object { (Attr $_.Value 'hreflang') -eq $code })
        if ($links.Count -ne 1 -or (Attr $links[0].Value 'href') -ne $expected) { $issues.Add("${file}: hreflang $code") }
      }
    }
  }
}
foreach ($key in 'Title','Description','Canonical') {
  foreach ($group in $records | Group-Object $key | Where-Object Count -gt 1) { $issues.Add("Duplicate ${key}: " + ($group.Group.File -join ', ')) }
}
$locs = @([regex]::Matches([IO.File]::ReadAllText((Join-Path $Root 'sitemap.xml')),'<loc>(.*?)</loc>') | ForEach-Object { $_.Groups[1].Value })
foreach ($record in $records) { if ($record.Canonical -notin $locs) { $issues.Add("$($record.File): absent from sitemap") } }
if ($locs.Count -ne $records.Count -or @($locs | Select-Object -Unique).Count -ne $locs.Count) { $issues.Add('Sitemap count or duplicates') }
[pscustomobject]@{Pages=$records.Count; SitemapURLs=$locs.Count; Issues=@($issues | Sort-Object -Unique)} | ConvertTo-Json -Depth 4
if ($issues.Count) { exit 1 }
