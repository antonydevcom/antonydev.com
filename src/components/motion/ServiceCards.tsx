'use client';
import { motion } from 'motion/react';
import { InView } from '@/components/motion-primitives/in-view';
import { Spotlight } from '@/components/motion-primitives/spotlight';
import { BorderTrail } from '@/components/motion-primitives/border-trail';
import { cardStagger, cardReveal, ease } from '@/lib/motion';

interface Phase {
  number: string;
  label: string;
  title: string;
  description: string;
  detail: string;
  href: string;
}

interface Extra {
  title: string;
  description: string;
  href: string;
}

interface ServiceCardsProps {
  phases: Phase[];
  extras: Extra[];
}

function PhaseCard({ phase }: { phase: Phase }) {
  return (
    <motion.li variants={cardReveal} className='phase-card'>
      <Spotlight
        size={240}
        springOptions={{ bounce: 0, damping: 30 }}
        className='opacity-40'
      />
      <BorderTrail
        size={44}
        transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
        className='opacity-25'
      />

      <div className='phase-number' aria-hidden='true'>{phase.number}</div>
      <div className='phase-content'>
        <p className='phase-label'>{phase.label}</p>
        <h3 className='phase-title'>{phase.title}</h3>
        <p className='phase-desc'>{phase.description}</p>
        <p className='phase-detail'>{phase.detail}</p>
        <a href={phase.href} className='phase-link'>
          Ver detalles
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <line x1='5' y1='12' x2='19' y2='12' />
            <polyline points='12 5 19 12 12 19' />
          </svg>
        </a>
      </div>
    </motion.li>
  );
}

function ExtraCard({ extra }: { extra: Extra }) {
  return (
    <motion.li variants={cardReveal} className='extra-card'>
      <Spotlight
        size={180}
        springOptions={{ bounce: 0, damping: 30 }}
        className='opacity-35'
      />

      <h3 className='extra-title'>{extra.title}</h3>
      <p className='extra-desc'>{extra.description}</p>
      <a href={extra.href} className='extra-link'>
        Más información
        <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
          <line x1='5' y1='12' x2='19' y2='12' />
          <polyline points='12 5 19 12 12 19' />
        </svg>
      </a>
    </motion.li>
  );
}

export function ServiceCards({ phases, extras }: ServiceCardsProps) {
  return (
    <>
      <InView
        variants={cardStagger}
        transition={{ duration: 0 }}
        viewOptions={{ once: true, margin: '0px 0px -80px 0px' }}
        once
        as='ol'
        className='phases-list'
        role='list'
      >
        {phases.map((phase) => (
          <PhaseCard key={phase.number} phase={phase} />
        ))}
      </InView>

      <div className='extras-section'>
        <InView
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.55, ease: ease.premium }}
          viewOptions={{ once: true, margin: '0px 0px -40px 0px' }}
          once
          as='p'
          className='extras-label'
        >
          También incluyo
        </InView>

        <InView
          variants={cardStagger}
          transition={{ duration: 0 }}
          viewOptions={{ once: true, margin: '0px 0px -60px 0px' }}
          once
          as='ul'
          className='extras-grid'
          role='list'
        >
          {extras.map((extra) => (
            <ExtraCard key={extra.title} extra={extra} />
          ))}
        </InView>
      </div>
    </>
  );
}
