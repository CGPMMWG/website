/* Each language has its own crawlable URL. Saved preferences never change a URL's language. */
(function () {
  'use strict';
  var configNode = document.getElementById('page-seo');
  if (!configNode) return;
  var config = JSON.parse(configNode.textContent);
  // The script lives in js/ even when opened from a subfolder or file://.
  var siteRoot = new URL('../', document.currentScript.src);
  function siteURL(route) {
    var url = new URL(route.replace(/^\//, ''), siteRoot);
    if (url.protocol === 'file:' && url.pathname.endsWith('/')) url.pathname += 'index.html';
    return url;
  }
  var lang = document.documentElement.dataset.siteLanguage || 'es';
  try {
    localStorage.setItem('trendLang', lang);
    localStorage.setItem('preferredLanguage', lang);
  } catch (_) { /* Storage is optional. */ }

  var current = new URL(location.href);
  var requested = current.searchParams.get('lang');
  if (requested && config.alternates[requested]) {
    var destination = siteURL(config.alternates[requested]);
    current.searchParams.delete('lang');
    destination.search = current.search;
    destination.hash = current.hash;
    if (destination.href !== location.href) location.replace(destination.href);
  }

  function localizeLink(link) {
    var raw = link.getAttribute('href');
    if (!raw || /^(mailto:|tel:|javascript:|data:)/i.test(raw)) return;
    var url = new URL(raw, location.href);
    if (url.origin !== location.origin && url.origin !== 'https://trendmakers.agency') return;
    var sitePath = url.pathname;
    if (url.origin === siteRoot.origin && sitePath.startsWith(siteRoot.pathname)) {
      sitePath = '/' + sitePath.slice(siteRoot.pathname.length);
    } else if (url.protocol === 'file:' && /^\/(?!\/)/.test(raw)) {
      // On Windows, file:///C:/ plus /academy/ becomes /C:/academy/.
      sitePath = new URL(raw, 'https://trendmakers.agency').pathname;
    }
    var sourcePath = sitePath.replace(/^\/en(?=\/)/, '').replace(/index\.html$/, '');
    if (!config.pages.includes(sourcePath)) return;
    var targetLang = link.dataset.lang || lang;
    var targetPath = targetLang === 'en' && config.english.includes(sourcePath) ? '/en' + sourcePath : sourcePath;
    url.searchParams.delete('lang');
    var target = siteURL(targetPath);
    var href = (target.protocol === 'file:' ? target.href : target.pathname) + url.search + url.hash;
    if (raw !== href) link.setAttribute('href', href);
  }

  function syncLinks(root) {
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.matches && root.matches('a[href]')) localizeLink(root);
    root.querySelectorAll('a[href]').forEach(localizeLink);
  }

  document.addEventListener('click', function (event) {
    var option = event.target.closest('a.lang-option');
    if (!option) return;
    // Keep normal anchor behavior, including opening a language in a new tab.
    event.stopImmediatePropagation();
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      var target = new URL(option.href);
      target.hash = location.hash;
      location.assign(target.href);
    }
  }, true);

  document.addEventListener('DOMContentLoaded', function () {
    // Run after the existing page translators and retain the editorial metadata.
    setTimeout(function () {
      document.title = config.title;
      document.querySelector('meta[name="description"]').content = config.description;
      document.documentElement.lang = lang;
      syncLinks(document);
      new MutationObserver(function (records) {
        records.forEach(function (record) {
          if (record.type === 'attributes') localizeLink(record.target);
          else record.addedNodes.forEach(syncLinks);
        });
      }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
    });
  });
})();
