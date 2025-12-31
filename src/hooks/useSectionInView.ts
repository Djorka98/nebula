import { useCallback, useEffect, useRef, useState } from 'react';

export interface SectionInViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export const useSectionInView = <T extends HTMLElement = HTMLElement>(
  options: SectionInViewOptions = {}
) => {
  const { once = false, ...observerOptions } = options;
  const elementRef = useRef<T | null>(null);
  const [currentNode, setCurrentNode] = useState<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const callbackRef = useCallback((node: T | null) => {
    elementRef.current = node;
    setCurrentNode(node);
  }, []);

  useEffect(() => {
    const node = currentNode;

    if (!node) {
      return undefined;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return undefined;
    }

    let didUnobserve = false;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry) {
        setIsIntersecting(entry.isIntersecting);
      }

      if (entry?.isIntersecting && once && !didUnobserve) {
        didUnobserve = true;
        observer.unobserve(entry.target);
      }
    }, observerOptions);

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      if (once) {
        observer.disconnect();
      }
    };
  }, [currentNode, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold, once]);

  return { ref: callbackRef, inView: isIntersecting };
};
