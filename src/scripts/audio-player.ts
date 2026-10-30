// Behaviour for <AudioPlayer>. Loaded once per page, however many players there are.
// Only one demo plays at a time: starting one pauses whichever was playing.

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

let current: HTMLAudioElement | null = null;

function setup(root: HTMLElement) {
  if (root.dataset.ready) return;
  root.dataset.ready = 'true';

  const audio = root.querySelector<HTMLAudioElement>('[data-player-audio]')!;
  const toggle = root.querySelector<HTMLButtonElement>('[data-player-toggle]')!;
  const seek = root.querySelector<HTMLInputElement>('[data-player-seek]')!;
  const clock = root.querySelector<HTMLElement>('[data-player-current]')!;
  const status = root.querySelector<HTMLElement>('[data-player-status]')!;
  const title = toggle.getAttribute('aria-label')!.replace(/^Play demo: /, '');
  const total = () => (Number.isFinite(audio.duration) ? audio.duration : Number(seek.max)) || 1;
  let raf = 0;

  const setState = (state: 'idle' | 'loading' | 'playing' | 'paused' | 'error') => {
    root.dataset.state = state;
    const playing = state === 'playing' || state === 'loading';
    toggle.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} demo: ${title}`);
  };

  const render = () => {
    const t = audio.currentTime;
    root.style.setProperty('--progress', String(Math.min(1, t / total())));
    clock.textContent = fmt(t);
    seek.value = String(t);
    seek.setAttribute('aria-valuetext', `${fmt(t)} of ${fmt(total())}`);
  };

  const tick = () => {
    render();
    raf = requestAnimationFrame(tick);
  };

  toggle.addEventListener('click', () => {
    if (root.dataset.state === 'error') return;
    if (audio.paused) {
      seek.disabled = false;
      setState('loading');
      audio.play().catch(() => {
        setState('error');
        status.textContent = `Sorry, the demo “${title}” could not be played.`;
      });
    } else {
      audio.pause();
    }
  });

  seek.addEventListener('input', () => {
    audio.currentTime = Number(seek.value);
    render();
  });

  audio.addEventListener('waiting', () => setState('loading'));
  audio.addEventListener('playing', () => {
    setState('playing');
    if (current && current !== audio) current.pause();
    current = audio;
    seek.max = String(total());
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  });
  audio.addEventListener('pause', () => {
    cancelAnimationFrame(raf);
    render();
    if (root.dataset.state !== 'error') setState('paused');
    if (current === audio) current = null;
  });
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    render();
    setState('idle');
  });
  audio.addEventListener('error', () => {
    if (audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE || audio.error) {
      cancelAnimationFrame(raf);
      setState('error');
      status.textContent = `Sorry, the demo “${title}” is unavailable.`;
    }
  });
}

const init = () => document.querySelectorAll<HTMLElement>('[data-player]').forEach(setup);
init();
document.addEventListener('astro:page-load', init);
