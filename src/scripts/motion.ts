// Companion to src/styles/motion.css.
// 1. Reveal each .reveal section once: mark it .is-revealed when it is
//    170 px into the screen, then stop watching it.
// 2. Pause decorative animations while the tab is hidden, and inside any
//    [data-ambient] element while it is offscreen.
const root = document.documentElement;

const reveals = document.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window) {
  const once = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-revealed');
      once.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -170px 0px' });
  reveals.forEach((el) => once.observe(el));

  const seen = new IntersectionObserver((entries) => {
    for (const e of entries) e.target.toggleAttribute('data-offscreen', !e.isIntersecting);
  });
  document.querySelectorAll('[data-ambient]').forEach((el) => seen.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-revealed'));
}

const onVisibility = () => root.toggleAttribute('data-hidden', document.hidden);
document.addEventListener('visibilitychange', onVisibility);
onVisibility();

// 3. Product art morph: name only the card that leads to (or came from) the
//    product page, so it alone morphs into the page's hero and back.
const cardFor = (url?: string | null) => {
  if (!url) return null;
  const path = new URL(url).pathname.replace(/\.html$/, '');
  return document.querySelector<HTMLElement>(`[data-vt-href="${path}"]`);
};
type NavEvent = Event & { viewTransition?: { finished: Promise<void> } | null; activation?: { entry?: { url: string } | null; from?: { url: string } | null } | null };
addEventListener('pageswap', (e) => {
  const ev = e as NavEvent;
  const card = ev.viewTransition && cardFor(ev.activation?.entry?.url);
  if (card) card.style.viewTransitionName = card.dataset.vt!;
});
addEventListener('pagereveal', (e) => {
  const ev = e as NavEvent;
  const from = (window as unknown as { navigation?: { activation?: { from?: { url: string } } } }).navigation?.activation?.from?.url;
  const card = ev.viewTransition && cardFor(from);
  if (!card) return;
  card.style.viewTransitionName = card.dataset.vt!;
  ev.viewTransition!.finished.finally(() => { card.style.viewTransitionName = ''; });
});

// 3. "Pause motion" in the footer: stops every decorative animation on the
//    site, and remembers the choice in this browser (nothing is sent anywhere).
for (const btn of document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]')) {
  const sync = () => {
    const off = root.dataset.motion === 'off';
    btn.setAttribute('aria-pressed', String(off));
    btn.textContent = off ? 'Play motion' : 'Pause motion';
  };
  sync();
  btn.addEventListener('click', () => {
    const off = root.dataset.motion !== 'off';
    if (off) root.dataset.motion = 'off'; else delete root.dataset.motion;
    try { localStorage.setItem('motion', off ? 'off' : 'on'); } catch { /* storage blocked: still works for this page */ }
    sync();
  });
}
