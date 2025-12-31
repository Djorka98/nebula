import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Hero from './Hero';

vi.mock('gsap', () => ({
  gsap: {
    timeline: () => ({
      fromTo: vi.fn(),
      kill: vi.fn()
    })
  }
}));

vi.mock('./hero.gsap', async () => {
  const actual = await vi.importActual<typeof import('./hero.gsap')>('./hero.gsap');
  return {
    ...actual,
    createHeroTimeline: vi.fn().mockResolvedValue(() => undefined)
  };
});

describe('Hero', () => {
  it('matches snapshot', async () => {
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });
});
