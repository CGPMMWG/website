const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const origin = 'https://trendmakers.agency';
const pages = require('./seo-pages.json');
const route = file => '/' + file.replace(/index\.html$/, '');
const localized = (file, lang) => (lang === 'en' ? '/en' : '') + route(file);
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.mp4':'video/mp4', '.xml':'application/xml' };
async function browser() {
  return chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
}
async function server(override) {
  const instance = http.createServer(async (req, res) => {
    try {
      let name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (name.endsWith('/')) name += 'index.html';
      const file = path.resolve(root, '.' + name);
      if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
      const result = await override?.(name);
      const body = result ?? await fs.readFile(file);
      res.writeHead(200, {'Content-Type':mime[path.extname(file).toLowerCase()] || 'application/octet-stream'});
      res.end(body);
    } catch (_) { res.writeHead(404); res.end('Not found'); }
  });
  await new Promise(resolve => instance.listen(0, '127.0.0.1', resolve));
  return {url:`http://127.0.0.1:${instance.address().port}`, close:() => new Promise(resolve => instance.close(resolve))};
}
module.exports = {fs, path, root, origin, pages, route, localized, browser, server};
