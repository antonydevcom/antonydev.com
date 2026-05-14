import type { Transition, Variants } from 'motion/react';

/* ── Premium easing curves (mirrors tokens.css) ─────────── */
export const ease = {
  premium: [0.22, 1, 0.36, 1] as [number, number, number, number],
  out:     [0.16, 1, 0.3,  1] as [number, number, number, number],
  spring:  [0.34, 1.56, 0.64, 1] as [number, number, number, number],
};

/* ── Section scroll-reveal ───────────────────────────────── */
export const sectionReveal: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0  },
};

export const sectionRevealTransition: Transition = {
  duration: 0.65,
  ease: ease.premium,
};

/* ── Hero logo — value-specific transitions (motion.dev / react-transitions) ─
 * Springs with visualDuration + bounce on transform; tweens on opacity + blur
 * so the mark reads “hero” vs lighter section reveals.
 */
export const heroLogoEntranceTransition = {
  default: {
    type: 'spring' as const,
    visualDuration: 0.56,
    bounce: 0.36,
    mass: 0.88,
  },
  opacity: {
    type: 'tween' as const,
    duration: 0.44,
    ease: [0, 0.71, 0.2, 1.01] as [number, number, number, number],
  },
  filter: {
    type: 'tween' as const,
    duration: 1.28,
    ease: ease.premium,
  },
} satisfies Transition;

/* ── Card InView stagger ─────────────────────────────────── */
export const cardStagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 22, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.6, ease: ease.premium } },
};
