'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

// Direct motion values — no spring, no lag.
// The warm halo sits exactly under the native pointer.
const SIZE = 40;
const HALF = SIZE / 2;

export function PremiumCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - HALF);
      y.set(e.clientY - HALF);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('[data-cursor]')) setActive(true);
    };

    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as Element | null;
      if (!to?.closest('[data-cursor]')) setActive(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
    };
  }, [x, y]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        pointerEvents: 'none',
        zIndex: 9999,
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at center, rgba(183,167,154,0.48) 0%, rgba(183,167,154,0.12) 50%, transparent 70%)',
        filter: 'blur(5px)',
        willChange: 'transform',
      }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.3,
      }}
      transition={{
        opacity: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
        scale:   { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }}
    />
  );
}
