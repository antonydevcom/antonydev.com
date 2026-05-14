'use client';
import { TextEffect } from '@/components/motion-primitives/text-effect';

interface HeroHeadingProps {
  text: string;
  className?: string;
}

export function HeroHeading({ text, className }: HeroHeadingProps) {
  return (
    <TextEffect
      as='h1'
      per='word'
      preset='fade-in-blur'
      delay={0.52}
      speedReveal={0.8}
      speedSegment={1.1}
      className={className}
    >
      {text}
    </TextEffect>
  );
}
