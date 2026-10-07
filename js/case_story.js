(() => {
  const story = document.querySelector('.case-detail-page .case-story--scroll');
  if (!story) return;

  const wordmark = story.querySelector('.case-story__wordmark');
  const steps = story.querySelector('.case-story__steps');
  const cards = Array.from(steps.querySelectorAll('.case-story__step'));
  const cue = story.querySelector('.case-story__scroll-cue');
  const cueText = cue.querySelector('[data-story-cue]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Keep this query aligned with the pinned layout in case_story.css.
  const pinnedLayout = window.matchMedia('(min-width: 1100px) and (min-height: 720px)');
  const starts = [0.12, 0.38, 0.64];
  const duration = 0.2;
  const clamp = value => Math.max(0, Math.min(1, value));
  const range = (value, start, end) => clamp((value - start) / (end - start));
  const easeOut = value => 1 - Math.pow(1 - value, 3);
  let frame = 0;
  let active = true;
  let progress = null;
  let lastTime = 0;
  let nextCard = 0;

  function updateCue() {
    const english = document.documentElement.lang === 'en';
    const initial = nextCard === 0;
    const text = initial
      ? (english ? 'Scroll to discover the story' : 'Seguí bajando para descubrir la historia')
      : (english ? 'Keep scrolling' : 'Seguí bajando');
    if (cueText.textContent !== text) cueText.textContent = text;
    const target = nextCard < cards.length ? '#' + cards[nextCard].id : '#contact-form';
    if (cue.getAttribute('href') !== target) cue.setAttribute('href', target);
  }

  function setCard(card, value, distance, rotation, drift) {
    const eased = easeOut(value);
    card.style.setProperty('--card-opacity', range(value, 0, 0.45).toFixed(3));
    card.style.setProperty('--card-y', ((1 - eased) * distance).toFixed(2) + 'px');
    card.style.setProperty('--card-scale', (0.955 + eased * 0.045).toFixed(4));
    card.style.setProperty('--card-rotation', (rotation + (1 - eased) * 2.5).toFixed(3) + 'deg');
    card.style.setProperty('--card-drift', ((1 - eased) * drift).toFixed(2) + 'px');
    card.style.setProperty('--card-tilt', ((1 - eased) * 9).toFixed(3) + 'deg');
  }

  function render(timestamp) {
    frame = 0;
    if (reducedMotion.matches) return;
    const rect = story.getBoundingClientRect();
    const viewport = document.documentElement.clientHeight;
    let settling = false;

    if (pinnedLayout.matches) {
      const target = clamp(-rect.top / Math.max(1, rect.height - viewport));
      const delta = lastTime ? Math.min(timestamp - lastTime, 64) : 16;
      if (progress === null) progress = target;
      // A short, time-based ease absorbs wheel steps without changing native scroll.
      progress += (target - progress) * (1 - Math.exp(-delta / 85));
      if (Math.abs(target - progress) < 0.0001) progress = target;
      else settling = true;
      const entrance = easeOut(range(viewport - rect.top, viewport * 0.15, viewport * 0.85));
      const recede = easeOut(range(progress, 0.1, 0.4));
      wordmark.style.setProperty('--wordmark-opacity', (entrance * (1 - recede * 0.9)).toFixed(3));
      wordmark.style.setProperty('--wordmark-y', ((1 - entrance) * 56 - recede * 12).toFixed(2) + 'px');
      wordmark.style.setProperty('--wordmark-scale', (0.96 + entrance * 0.04 - recede * 0.035).toFixed(4));
      cards.forEach((card, index) => {
        setCard(card, range(progress, starts[index], starts[index] + duration), viewport * 0.7, [-0.8, 0.8, -0.4][index], [48, -48, 0][index]);
      });
      story.style.setProperty('--story-progress', range(progress, starts[0], starts[2] + duration).toFixed(4));
      nextCard = starts.filter(start => target >= start + duration - 0.015).length;
      story.classList.toggle('is-story-complete', progress >= starts[2] + duration);
    } else {
      const entrance = easeOut(range(viewport - rect.top, viewport * 0.12, viewport * 0.65));
      wordmark.style.setProperty('--wordmark-opacity', entrance.toFixed(3));
      wordmark.style.setProperty('--wordmark-y', ((1 - entrance) * 36).toFixed(2) + 'px');
      wordmark.style.setProperty('--wordmark-scale', '1');
      cards.forEach(card => {
        // Layout offsets exclude transforms and avoid animation feedback.
        const top = rect.top + steps.offsetTop + card.offsetTop;
        setCard(card, range(viewport - top, viewport * 0.04, viewport * 0.38), 64, 0, 0);
      });
      nextCard = 0;
      story.classList.remove('is-story-complete');
    }
    updateCue();
    lastTime = timestamp;
    if (settling && active) frame = requestAnimationFrame(render);
  }

  function schedule() {
    if (!frame && active && !reducedMotion.matches) frame = requestAnimationFrame(render);
  }

  function configure() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    progress = null;
    lastTime = 0;
    active = true;
    nextCard = 0;
    story.classList.toggle('is-scroll-ready', !reducedMotion.matches);
    story.classList.remove('is-story-complete');
    updateCue();
    if (!reducedMotion.matches) render(performance.now());
  }

  cue.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (reducedMotion.matches || !pinnedLayout.matches || nextCard >= cards.length) return;
    event.preventDefault();
    const rect = story.getBoundingClientRect();
    const target = starts[nextCard] + duration + 0.015;
    window.scrollTo({ top: window.scrollY + rect.top + (rect.height - document.documentElement.clientHeight) * target, behavior: 'smooth' });
  });

  configure();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', configure, { passive: true });
  window.addEventListener('pageshow', configure);
  reducedMotion.addEventListener('change', configure);
  pinnedLayout.addEventListener('change', configure);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      active = entries[0].isIntersecting;
      if (active) schedule();
    }, { rootMargin: '100% 0px' });
    observer.observe(story);
  }
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(document.querySelector('.case-detail-shell'));
    cards.forEach(card => observer.observe(card));
  }
  // The site's language switch replaces copy and updates the html lang attribute.
  new MutationObserver(() => { updateCue(); schedule(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  if (document.fonts) document.fonts.ready.then(schedule);
})();
