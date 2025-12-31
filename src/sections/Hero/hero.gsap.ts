export interface HeroTimelineElements {
  container: HTMLElement | null;
  heading: HTMLElement | null;
  subheading: HTMLElement | null;
  ctas: HTMLElement | null;
  device: HTMLElement | null;
}

export const createHeroTimeline = async ({
  container,
  heading,
  subheading,
  ctas,
  device
}: HeroTimelineElements): Promise<() => void> => {
  if (typeof window === 'undefined' || !container) {
    return () => undefined;
  }

  const { gsap } = await import('gsap');

  const timeline = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.9 }
  });

  if (heading) {
    timeline.fromTo(heading, { opacity: 0, y: 60 }, { opacity: 1, y: 0 }, 0);
  }

  if (subheading) {
    timeline.fromTo(subheading, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.1);
  }

  if (ctas) {
    timeline.fromTo(ctas, { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, 0.2);
  }

  if (device) {
    timeline.fromTo(device, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1 }, 0);
  }

  return () => {
    timeline.kill();
  };
};
