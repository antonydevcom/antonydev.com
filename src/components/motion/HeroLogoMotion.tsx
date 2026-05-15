'use client';

import { motion, useReducedMotion } from 'motion/react';
import { heroLogoEntranceTransition } from '@/lib/motion';

/**
 * Hero mark — Motion value-specific transitions (motion.dev):
 * spring (visualDuration + bounce) on transform; tweens on opacity + blur.
 * Inner loop: slow float after entrance settles.
 */
export function HeroLogoMotion() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="hero-logo-motion-root" aria-hidden="true">
        <img
          src="/images/branding/hero-logo.png"
          alt="AntonyDev — Antonio Valdovinos"
          width={1448}
          height={1086}
          loading="eager"
          decoding="async"
          className="hero-logo"
        />
      </div>
    );
  }

  return (
    <div className="hero-logo-motion-root" aria-hidden="true">
      <motion.div
        initial={{
          opacity: 0,
          y: 64,
          scale: 0.76,
          rotate: -2.75,
          filter: 'blur(22px)',
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
        }}
        transition={heroLogoEntranceTransition}
        style={{
          display: 'block',
          width: 'fit-content',
          maxWidth: '100%',
          marginInline: 'auto',
          transformOrigin: '50% 58%',
        }}
      >
        <motion.div
          animate={{
            y: [0, -14, -5, 11, 0],
            rotate: [0, 0.55, 0.2, -0.4, 0],
          }}
          transition={{
            duration: 5.75,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: 2.05,
          }}
          style={{ transformOrigin: '50% 55%' }}
        >
          <img
            src="/images/branding/hero-logo.png"
            alt="AntonyDev — Antonio Valdovinos"
            width={1448}
            height={1086}
            loading="eager"
            decoding="async"
            className="hero-logo"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
