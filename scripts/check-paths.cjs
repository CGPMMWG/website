const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { fs, path, root, pages, browser, server } = require('./site-tools.cjs');

async function main() {
  const mount = '/preview folder/website-main/';
  const local = await server(name => name.startsWith(mount)
    ? fs.readFile(path.join(root, name.slice(mount.length))) : undefined);
  const chrome = await browser();
  const files = pages.flatMap(page => [page.file, ...(page.en ? ['en/' + page.file] : [])]);
  const failures = [];
  const modes = [
    { name: 'subfolder', base: local.url + encodeURI(mount) },
    { name: 'file', base: pathToFileURL(root + path.sep).href }
  ];
  const jobs = modes.flatMap(mode => files.map(file => ({ ...mode, file })));
  let next = 0;
  try {
    await Promise.all(Array.from({ length: 3 }, async () => {
      const view = await chrome.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await view.route('**/*', route => /^(file:|http:\/\/127\.0\.0\.1:)/.test(route.request().url()) ? route.continue() : route.abort());
      while (next < jobs.length) {
        const job = jobs[next++];
        const errors = [];
        const onError = error => errors.push(error.message);
        const onResponse = response => {
          if (response.url().startsWith(local.url) && response.status() >= 400) errors.push('HTTP ' + response.status() + ' ' + response.url());
        };
        const onRequest = request => {
          if (request.url().startsWith(local.url) && !request.url().startsWith(job.base)) errors.push('Resource escaped site folder: ' + request.url());
        };
        view.on('pageerror', onError); view.on('response', onResponse); view.on('request', onRequest);
        await view.goto(new URL(job.file, job.base).href, { waitUntil: 'load' });
        await view.evaluate(async () => {
          const images = [...document.images];
          images.forEach(img => img.loading = 'eager');
          await Promise.all(images.map(img => img.decode().catch(() => {})));
        });
        await view.waitForTimeout(250);
        const result = await view.evaluate(base => ({
          broken: [...document.images].filter(img => !img.naturalWidth).map(img => img.getAttribute('src')),
          styles: [...document.styleSheets].filter(sheet => sheet.href && sheet.href.startsWith(base)).length,
          overflow: document.documentElement.scrollWidth - innerWidth,
          escaped: [...document.querySelectorAll('a[href]')].filter(a =>
            (a.protocol === 'file:' || a.origin === location.origin) && !a.href.startsWith(base)).map(a => a.getAttribute('href'))
        }), job.base);
        if (errors.length || result.broken.length || !result.styles || result.overflow > 1 || result.escaped.length) {
          failures.push({ mode: job.name, file: job.file, errors, ...result });
        }
        view.off('pageerror', onError); view.off('response', onResponse); view.off('request', onRequest);
      }
      await view.close();
    }));
    // Exercise language navigation and old ?lang= links.
    for (const mode of modes) {
      const view = await chrome.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await view.route('**/*', route => /^(file:|http:\/\/127\.0\.0\.1:)/.test(route.request().url()) ? route.continue() : route.abort());
      await view.goto(mode.base + 'index.html?lang=en#servicios');
      await view.waitForURL(url => url.pathname.includes('/en/') && url.hash === '#servicios');
      await view.locator('nav .lang-toggle').first().click();
      await view.locator('nav a.lang-option[data-lang="es"]').first().click();
      await view.waitForURL(url => !url.pathname.includes('/en/') && url.hash === '#servicios');
      assert.ok(view.url().startsWith(mode.base), mode.name + ': language switch escaped folder');
      await view.close();
    }
    if (process.env.PATH_REPORT) await fs.writeFile(process.env.PATH_REPORT, JSON.stringify({ checked: jobs.length, failures }, null, 2));
    failures.forEach(failure => console.error(JSON.stringify(failure)));
    assert.equal(failures.length, 0, 'Broken resources or navigation in local previews');
    console.log(`PASS: ${jobs.length} renders; subfolder and file previews, images, styles, scripts, internal links and language navigation.`);
  } finally { await chrome.close(); await local.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
