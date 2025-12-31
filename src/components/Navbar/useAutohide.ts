import { useEffect, useRef, useState } from 'react';

export default function useAutohide(threshold = 8): boolean {
  const lastScroll = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScroll.current;

      if (Math.abs(delta) > threshold) {
        setHidden(delta > 0 && current > 80);
      }

      lastScroll.current = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return hidden;
}
