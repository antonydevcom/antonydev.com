'use client';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import type { CSSProperties } from 'react';

interface PageHeadingProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}

export function PageHeading({ text, className, style, delay = 0.15 }: PageHeadingProps) {
  return (
    <TextEffect
      as='h1'
      per='word'
      preset='cinematic'
      delay={delay}
      speedReveal={0.62}
      speedSegment={0.82}
      className={className}
      style={style}
    >
      {text}
    </TextEffect>
  );
}
