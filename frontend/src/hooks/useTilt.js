import { useRef, useEffect } from 'react';

/**
 * Safe, performant custom hook for subtle card hover tilt
 */
export function useTilt(options = {}) {
  const elementRef = useRef(null);
  const max = options.max || 6;
  const scale = options.scale || 1.015;
  const speed = options.speed || 400;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let bounds;

    const onMouseEnter = () => {
      bounds = el.getBoundingClientRect();
      el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = el.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const tiltX = (yPct * -max).toFixed(2);
      const tiltY = (xPct * max).toFixed(2);

      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    };

    const onMouseLeave = () => {
      el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [max, scale, speed]);

  return elementRef;
}
