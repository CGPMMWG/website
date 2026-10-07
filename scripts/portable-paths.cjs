const path = require('node:path');

// Keep public SEO URLs absolute; make browser resources and navigation portable.
function portableMarkup(html, file) {
  const prefix = '../'.repeat(file.split('/').length - 1) || './';
  function relative(value) {
    if (!/^\/(?!\/)/.test(value)) return value;
    const [, pathname, suffix] = value.match(/^([^?#]*)(.*)$/s);
    const target = pathname.endsWith('/') ? pathname + 'index.html' : pathname;
    return prefix + target.slice(1) + suffix;
  }
  html = html.replace(/\b(href|src|poster|action)=(['"])(\/[^'"]*)\2/g,
    (_, attr, quote, value) => attr + '=' + quote + relative(value) + quote);
  html = html.replace(/\bsrcset=(['"])(.*?)\1/gs, (_, quote, value) =>
    'srcset=' + quote + value.replace(/(^|,\s*)(\/[^\s,]+)/g,
      (_, space, url) => space + relative(url)) + quote);
  // Image paths embedded in inline translation dictionaries and CSS.
  html = html.replace(/(["'`(])\/(img|video)\//g, '$1' + prefix + '$2/');
  return html;
}

module.exports = { portableMarkup };

if (require.main === module) {
  const fs = require('node:fs/promises');
  const root = path.resolve(__dirname, '..');
  const pages = require('./seo-pages.json');
  (async () => {
    for (const page of pages) {
      for (const file of [page.file, ...(page.en ? ['en/' + page.file] : [])]) {
        const full = path.join(root, file);
        const html = await fs.readFile(full, 'utf8');
        await fs.writeFile(full, portableMarkup(html, file));
      }
    }
    console.log('Updated resource and navigation paths in all 55 pages.');
  })().catch(error => { console.error(error); process.exitCode = 1; });
}
