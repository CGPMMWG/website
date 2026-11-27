'use strict';
// Deterministic publisher for approved editorial packages. No model or shell commands from input.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function validate(p) {
  assert(p && p.status === 'Approved', 'Package must be Approved');
  assert(typeof p.approvedBy === 'string' && p.approvedBy.trim(), 'approvedBy required');
  assert(!Number.isNaN(Date.parse(p.approvedAt)), 'approvedAt required');
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) && p.slug.length <= 100, 'Invalid slug');
  for (const k of ['title','description','category','intro','linkedin']) assert(typeof p[k] === 'string' && p[k].trim(), k + ' required');
  assert(p.title.length <= 150 && p.description.length <= 300, 'Metadata too long');
  assert(p.linkedin.length <= 3000, 'LinkedIn text exceeds 3000 characters');
  assert(Array.isArray(p.sections) && p.sections.length >= 2, 'At least two sections required');
  for (const s of p.sections) {
    assert(typeof s.heading === 'string' && s.heading.trim(), 'Section heading required');
    assert(Array.isArray(s.paragraphs) && s.paragraphs.length && s.paragraphs.every(x => typeof x === 'string' && x.trim()), 'Paragraphs required');
  }
  assert(Array.isArray(p.sources) && p.sources.length >= 2, 'At least two sources required');
  for (const s of p.sources) {
    assert(typeof s.title === 'string' && s.title.trim(), 'Source title required');
    assert(new URL(s.url).protocol === 'https:', 'Sources must use HTTPS');
  }
  return p;
}
function publish(root, input) {
  const p = validate(input);
  const file = 'blog/' + p.slug + '.html';
  const article = path.join(root, file);
  assert(!fs.existsSync(article), 'Article already exists; refusing to overwrite');
  const catalogPath = path.join(root, 'scripts/seo-pages.json');
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  assert(!catalog.some(x => x.file === file), 'Duplicate catalog entry');
  let html = fs.readFileSync(path.join(root, 'blog/blog-email-marketing-automatizacion.html'), 'utf8');
  assert((html.match(/<main\b/g) || []).length === 1, 'Template must have one main');
  const e = escapeHtml;
  const main = '<main class="article-shell"><a class="back-link" href="../blog/index.html">Volver</a>' +
    '<div class="article-intro"><section class="article-hero"><h1>' + e(p.title) + '</h1>' +
    '<p class="article-meta">TrendMakers · ' + e(p.category) + '</p><p>' + e(p.intro) + '</p></section></div>' +
    p.sections.map(s => '<section class="article-section"><h2>' + e(s.heading) + '</h2>' +
      s.paragraphs.map(t => '<p>' + e(t) + '</p>').join('') + '</section>').join('') +
    '<section class="article-section"><h2>Fuentes</h2><ul>' +
    p.sources.map(s => '<li><a rel="noopener noreferrer" href="' + e(s.url) + '">' + e(s.title) + '</a></li>').join('') +
    '</ul></section><section class="article-section"><a class="button" href="../index.html#contact-form">Conversemos sobre tu negocio</a></section></main>';
  html = html.replace(/<main\b[^>]*>[\s\S]*?<\/main>/, main);
  html = html.replace(/<script\b[^>]*src=["'][^"']*blog_email_marketing_i18n[^"']*["'][^>]*>\s*<\/script>/g, '');
  html = html.replace(/<script\b[^>]*id=["']legacy-article-translation["'][^>]*>[\s\S]*?<\/script>/g, '');
  html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>' + e(p.title) + ' | TrendMakers</title>');
  const indexPath = path.join(root, 'blog/index.html');
  let index = fs.readFileSync(indexPath, 'utf8');
  const marker = /<(?:div|section)\b[^>]*class=["'][^"']*\bblog-grid\b[^"']*["'][^>]*>/;
  assert(marker.test(index), 'Blog grid not found; no changes written');
  assert(!index.includes('href="' + p.slug + '.html"'), 'Duplicate blog card');
  const card = '<a class="blog-card" href="../blog/' + p.slug + '.html"><div class="blog-card__media"><img src="../img/og-trendmakers.png" alt="" loading="lazy"></div><div class="blog-card__content"><p class="blog-card__meta">' + e(p.category) + '</p><h2 class="blog-card__title">' + e(p.title) + '</h2><p class="blog-card__excerpt">' + e(p.description) + '</p><span class="blog-card__cta">Leer artículo</span></div></a>';
  index = index.replace(marker, m => m + '\n' + card);
  catalog.push({file, type:'BlogPosting', image:'og-trendmakers.png', es:{title:p.title + ' | TrendMakers',description:p.description}, en:null,
    relatedFiles:['servicios/marketing-automation.html','servicios/ia-hub.html']});
  const digest = crypto.createHash('sha256').update(JSON.stringify(p)).digest('hex');
  const record = {slug:p.slug,status:'Approved',approvedBy:p.approvedBy,approvedAt:p.approvedAt,sha256:digest,
    articleUrl:'https://trendmakers.agency/' + file,linkedin:p.linkedin,sources:p.sources,
    socialStatus:'Pending Approval',note:'Commit is not evidence of deployment or LinkedIn publication.'};
  fs.mkdirSync(path.join(root,'editorial/records'),{recursive:true});
  fs.writeFileSync(article,html);
  fs.writeFileSync(indexPath,index);
  fs.writeFileSync(catalogPath,JSON.stringify(catalog,null,2) + '\n');
  fs.writeFileSync(path.join(root,'editorial/records',p.slug + '.json'),JSON.stringify(record,null,2) + '\n');
  return record;
}
module.exports = {validate,publish,escapeHtml};
if (require.main === module) {
  assert(process.argv[2], 'Usage: node scripts/editorial-publish.cjs approved-package.json');
  const p = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  console.log(JSON.stringify(publish(path.resolve(__dirname,'..'),p),null,2));
}
