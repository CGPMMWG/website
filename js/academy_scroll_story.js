(function () {
  var story = document.querySelector('.academy-scroll-story');
  if (!story) return;

  var panels = Array.prototype.slice.call(story.querySelectorAll('.academy-story-panel'));
  if (!panels.length) return;

  panels.forEach(function (panel, index) {
    panel.style.setProperty('--story-index', index);
  });

  var progress = story.querySelector('.academy-story-progress');
  var steps = progress ? Array.prototype.slice.call(progress.querySelectorAll('a')) : [];
  var desktop = window.matchMedia('(min-width: 901px) and (min-height: 760px)');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var activeIndex = -1;
  var framePending = false;

  function updateProgress() {
    framePending = false;
    var bounds = story.getBoundingClientRect();
    var readingLine = 72 + (window.innerHeight - 72) / 2;
    var inStory = bounds.top <= readingLine && bounds.bottom > readingLine;

    if (progress) progress.hidden = !desktop.matches || !inStory;
    if (!inStory) return;

    // Earlier sticky panels remain onscreen behind later ones. The last panel
    // to cross the reading line is the one the visitor is currently reading.
    var current = 0;
    panels.forEach(function (panel, index) {
      if (panel.getBoundingClientRect().top <= readingLine) current = index;
    });

    if (current === activeIndex) return;
    activeIndex = current;
    panels.forEach(function (panel, index) {
      panel.classList.toggle('is-active', index === current);
    });
    steps.forEach(function (step, index) {
      if (index === current) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
  }

  function scheduleUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateProgress);
  }

  function getScrollContainer() {
    var parent = story.parentElement;
    while (parent && parent !== document.documentElement) {
      if (/(auto|scroll)/.test(window.getComputedStyle(parent).overflowY) && parent.scrollHeight > parent.clientHeight) return parent;
      parent = parent.parentElement;
    }
    return document.scrollingElement || document.documentElement;
  }

  // Resolve the panel's original position, even when it is already pinned
  // underneath another panel. Native anchor scrolling cannot distinguish that.
  document.querySelectorAll('a[href="#experiencia"], a[href="#metodologia"], a[href="#diploma"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var panel = document.getElementById(link.hash.slice(1));
      var index = panels.indexOf(panel);
      if (index < 0 || window.getComputedStyle(panel).position !== 'sticky') return;

      event.preventDefault();
      var scroller = getScrollContainer();
      var scrollTopEdge = scroller === document.scrollingElement ? 0 : scroller.getBoundingClientRect().top;
      var target = scroller.scrollTop + story.getBoundingClientRect().top - scrollTopEdge;
      for (var i = 0; i < index; i += 1) target += panels[i].offsetHeight;
      target -= parseFloat(window.getComputedStyle(panel).top) || 0;
      if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash);
      scroller.scrollTo({ top: target, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    });
  });

  document.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleUpdate).observe(story);
  updateProgress();
})();
