'use client';
import { motion } from 'motion/react';
import { InView } from '@/components/motion-primitives/in-view';
import { BorderTrail } from '@/components/motion-primitives/border-trail';
import { cardStagger, cardReveal, ease } from '@/lib/motion';

interface Project {
  title: string;
  category: string;
  tagline: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imagePosition: string;
  href: string;
}

interface ProjectCardsProps {
  projects: Project[];
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Ver proyecto: ${project.title} (abre en nueva pestaña)`}
      variants={cardReveal}
      className='project-card'
      data-cursor='premium'
      whileHover={{ y: -5, transition: { duration: 0.28, ease: ease.premium } }}
    >
      {/* Very slow, faint border trail */}
      <BorderTrail
        size={36}
        transition={{ repeat: Infinity, duration: 11, ease: 'linear' }}
        className='opacity-20'
      />

      <div className='card-image'>
        <img
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          loading='lazy'
          decoding='async'
          style={{ objectPosition: project.imagePosition }}
        />
        <div className='card-overlay' aria-hidden='true'>
          <p className='overlay-tagline'>{project.tagline}</p>
        </div>
      </div>
      <div className='card-info'>
        <div className='card-meta'>
          <h3 className='card-title'>{project.title}</h3>
          <p className='card-category'>{project.category}</p>
        </div>
        <svg
          className='card-arrow'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden='true'
        >
          <line x1='7' y1='17' x2='17' y2='7' />
          <polyline points='7 7 17 7 17 17' />
        </svg>
      </div>
    </motion.a>
  );
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <InView
      variants={cardStagger}
      transition={{ duration: 0 }}
      viewOptions={{ once: true, margin: '0px 0px -80px 0px' }}
      once
      as='div'
      className='projects-grid'
    >
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </InView>
  );
}
