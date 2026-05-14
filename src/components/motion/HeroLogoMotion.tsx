'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ease } from '@/lib/motion';

/**
 * Hero mark — spring entrance + soft focus resolve (no clip-path).
 * After ~1.85s, slow editorial float (same rhythm the user preferred).
 */
export function HeroLogoMotion() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="hero-logo-motion-root" aria-hidden="true">
        <img
          src="/images/branding/logo.png"
          alt="AntonyDev — Antony Valdovinos"
          width={500}
          height={500}
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
          y: 38,
          scale: 0.9,
          rotate: -1.2,
          filter: 'blur(12px)',
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 0.95,
          ease: ease.premium,
        }}
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
            delay: 1.85,
          }}
          style={{ transformOrigin: '50% 55%' }}
        >
          <img
            src="/images/branding/logo.png"
            alt="AntonyDev — Antony Valdovinos"
            width={500}
            height={500}
            loading="eager"
            decoding="async"
            className="hero-logo"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
