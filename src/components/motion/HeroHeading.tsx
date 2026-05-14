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
      preset='cinematic'
      delay={0.44}
      speedReveal={0.62}
      speedSegment={0.82}
      className={className}
    >
      {text}
    </TextEffect>
  );
}
