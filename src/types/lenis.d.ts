declare module 'lenis' {
  export interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
  }

  export interface LenisScrollEvent {
    scroll: number;
    progress: number;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    scrollTo(target: HTMLElement | number | string, options?: { offset?: number }): void;
    destroy(): void;
    on(event: 'scroll', handler: (event: LenisScrollEvent) => void): void;
    off(event: 'scroll', handler: (event: LenisScrollEvent) => void): void;
  }
}
