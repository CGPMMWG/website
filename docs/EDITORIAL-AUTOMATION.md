# TrendMakers editorial integration (phase 1)
Status: foundation committed; not an end-to-end production system.

## Implemented
- scripts/editorial-publish.cjs accepts an approved JSON editorial package.
- It reuses the existing Spanish article shell, renders escaped text, updates blog/index.html and scripts/seo-pages.json, and records approval plus LinkedIn draft in editorial/records.
- It refuses unapproved packages, invalid slugs, existing articles, missing sources and oversized LinkedIn text.
- .github/workflows/editorial-prepare.yml can validate, rebuild SEO, run site checks, and commit to an editorial review branch.
- No automatic merge or LinkedIn publication.

## Activation dependencies
The workflow must first be reviewed and merged to main for workflow_dispatch.
The local n8n instance needs its own GitHub credential; the ChatGPT GitHub connector does not transfer authentication to n8n.
Use a narrowly scoped credential authorized for workflow dispatch. Never place a token in workflow JSON or source control.
GitHub Actions uses the repository's runner allowance; check account limits before activating.
Ollama is the intended local model option but is not yet connected or tested.
LinkedIn authorized publishing credentials and organization identity remain pending.

## Payload contract
```json
{
  "status": "Approved",
  "approvedBy": "human reviewer",
  "approvedAt": "2026-11-25T20:00:00Z",
  "slug": "unique-article-slug",
  "title": "Article title",
  "description": "Search description",
  "category": "Marketing",
  "intro": "Introduction",
  "sections": [
    {"heading": "First section", "paragraphs": ["Reviewed text"]},
    {"heading": "Second section", "paragraphs": ["Reviewed text"]}
  ],
  "sources": [
    {"title": "Verified source A", "url": "https://example.org/a"},
    {"title": "Verified source B", "url": "https://example.org/b"}
  ],
  "linkedin": "Reviewed draft with article link"
}
```
The approval fields are an audit record, not authentication. Restrict dispatch rights and add n8n's actual human approval gate before using this automatically.
Source URLs are required but their contents are not automatically fact-checked by this renderer.

## Intended n8n chain
Research -> local model -> editorial review -> Approved package -> GitHub workflow dispatch -> inspect successful run and branch -> review/merge -> confirm live article -> LinkedIn approval -> authorized LinkedIn API -> record Published URL.

Do not mark content Published from a commit or dispatch response.
Do not retry LinkedIn publication blindly after a timeout; reconcile the external publication ID first.
Do not infer unpublished LinkedIn content from an incomplete history.

## Validation performed
Three local Node tests passed: approval/path protection, unsafe source/length validation, and rendering/escaping/duplicate protection.
The GitHub Actions job and full site build have not been executed.
New articles initially have en:null; add reviewed translations before enabling an English alternate.
The template has article-specific CSS that needs visual review for each new article.
