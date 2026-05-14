'use client';
import { motion } from 'motion/react';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import { ease } from '@/lib/motion';

interface SectionHeaderRevealProps {
  eyebrow: string;
  heading: string;
  headingId?: string;
  subtitle?: string;
  headingPer?: 'word' | 'char' | 'line';
  showDivider?: boolean;
}

export function SectionHeaderReveal({
  eyebrow,
  heading,
  headingId,
  subtitle,
  headingPer = 'word',
  showDivider = true,
}: SectionHeaderRevealProps) {
  return (
    <header className='section-header'>
      <TextEffect
        as='p'
        per='char'
        preset='cinematic'
        delay={0}
        speedReveal={1.9}
        speedSegment={1.4}
        className='eyebrow'
      >
        {eyebrow}
      </TextEffect>

      <TextEffect
        as='h2'
        per={headingPer}
        preset='cinematic'
        delay={0.18}
        speedReveal={0.72}
        speedSegment={0.86}
        id={headingId}
      >
        {heading}
      </TextEffect>

      {showDivider && (
        <motion.div
          className='section-divider'
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, ease: ease.premium, delay: 0.64 }}
          style={{ transformOrigin: 'center' }}
        />
      )}

      {subtitle && (
        <motion.p
          className='section-subtitle'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: ease.premium, delay: 0.82 }}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
