import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSectionInView } from './useSectionInView';

describe('useSectionInView', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    const intersectionObserverStub = vi.fn().mockImplementation((callback: IntersectionObserverCallback) => {
      return {
        observe: (...args: Parameters<IntersectionObserver['observe']>) => {
          (observeMock as unknown as (...a: any[]) => void)(...args);
          callback(
            [
              {
                isIntersecting: true,
                target: args[0] as Element
              } as IntersectionObserverEntry
            ],
            {} as IntersectionObserver
          );
        },
        unobserve: unobserveMock,
        disconnect: disconnectMock,
        takeRecords: vi.fn()
      } as unknown as IntersectionObserver;
    });

    vi.stubGlobal('IntersectionObserver', intersectionObserverStub);
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: intersectionObserverStub
    });
  });

  it('returns inView true when intersection occurs', async () => {
    const { result } = renderHook(() => useSectionInView());

    const element = document.createElement('section');

    await act(async () => {
      result.current.ref(element);
    });

    await waitFor(() => {
      expect(observeMock).toHaveBeenCalledWith(element);
      expect(result.current.inView).toBe(true);
    });
  });
});
