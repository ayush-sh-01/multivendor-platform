import { useRef, useEffect } from 'react';

/**
 * Custom hook providing smooth 3D tilt physics and light glare on hover
 */
export function useTilt(options = { max: 12, scale: 1.02, speed: 400 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let bounds;

    const onMouseEnter = () => {
      bounds = el.getBoundingClientRect();
      el.style.transition = `transform ${options.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = el.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const tiltX = (yPct * -options.max).toFixed(2);
      const tiltY = (xPct * options.max).toFixed(2);

      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${options.scale}, ${options.scale}, ${options.scale})`;
    };

    const onMouseLeave = () => {
      el.style.transition = `transform ${options.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
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
  }, [options]);

  return elementRef;
}
