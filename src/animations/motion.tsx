type BezierTuple = [number, number, number, number];

const easeOut: BezierTuple = [0.2, 0.68, 0.18, 0.99];
const easeInOut: BezierTuple = [0.45, 0, 0.15, 1];

export const fade = (delay = 0, duration = 0.7) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration, delay } }
});

export const blurFade = (delay = 0, duration = 0.8) => ({
  hidden: { opacity: 0, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration, ease: easeInOut, delay }
  }
});

export const slideUp = (delay = 0, y = 28, duration = 0.85) => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: easeOut, delay }
  }
});

export const slideLeft = (delay = 0, x = 32, duration = 0.85) => ({
  hidden: { opacity: 0, x },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: easeOut, delay }
  }
});

export const slideRight = (delay = 0, x = 32, duration = 0.85) => ({
  hidden: { opacity: 0, x: -x },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: easeOut, delay }
  }
});

export const scaleIn = (delay = 0, scale = 0.94, duration = 0.65) => ({
  hidden: { opacity: 0, scale },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: easeOut, delay }
  }
});

export const floatIn = (delay = 0, y = 24, duration = 0.9) => ({
  hidden: { opacity: 0, y, scale: 0.96, rotateX: -6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration, ease: easeInOut, delay }
  }
});

export const stagger = (staggerTime = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerTime,
      delayChildren
    }
  }
});

export const viewport = {
  once: false,
  amount: 0.32,
  margin: '0px 0px -18% 0px'
} as const;

export const viewportOnce = viewport;
