(function () {
  function configureServiceBack() {
    var button = document.querySelector('.shell > .back-btn');
    if (!button) return;

    var cameFromPortfolio = false;

    if (document.referrer) {
      try {
        var previous = new URL(document.referrer);
        var path = previous.pathname.replace(/\/+$/, '');
        cameFromPortfolio = previous.origin === window.location.origin &&
          (path === '/servicios' || path === '/servicios/index.html');
      } catch (_) {
        cameFromPortfolio = false;
      }
    }

    button.href = cameFromPortfolio ? '/servicios/' : '/index.html#problema';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', configureServiceBack);
  } else {
    configureServiceBack();
  }
})();
