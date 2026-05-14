'use client';
import { InView } from '@/components/motion-primitives/in-view';
import { sectionReveal, sectionRevealTransition } from '@/lib/motion';
import type { ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'header' | 'footer' | 'section' | 'article' | 'span';
}

export function SectionReveal({ children, className, delay = 0, as = 'div' }: SectionRevealProps) {
  const transition = delay
    ? { ...sectionRevealTransition, delay }
    : sectionRevealTransition;

  return (
    <InView
      variants={sectionReveal}
      transition={transition}
      viewOptions={{ once: true, margin: '0px 0px -60px 0px' }}
      once
      as={as}
      {...(className ? { className } : {})}
    >
      {children}
    </InView>
  );
}
