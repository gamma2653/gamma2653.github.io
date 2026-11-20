import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { coveredProjects, type CaseStudy } from '../data/case-studies';
import type { ProjectLink } from '../data/projects';
import Card from './card';
import Collage from './collage';
import Tag from './tag';

type CaseStudyCardProps = {
  study: CaseStudy;
  variant?: 'full' | 'compact';
}

const externalLink = { target: '_blank', rel: 'noopener noreferrer' } as const;

const COMPACT_TAG_LIMIT = 4;

/** Repositories of the covered projects, then the study's other links, one entry per URL. */
function studyLinks(study: CaseStudy): ProjectLink[] {
  const repos = coveredProjects(study).flatMap((project) =>
    project.repo ? [{ label: `${project.title} repository`, href: project.repo }] : [],
  );
  const seen = new Set<string>();
  return [...repos, ...study.links].filter(({ href }) => {
    if (seen.has(href)) return false;
    seen.add(href);
    return true;
  });
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyCard({ study, variant = 'full' }: CaseStudyCardProps) {
  const { title, subtitle, year, summary, problem, built, outcome, category, tags, images = [] } = study;
  const meta = [subtitle, year].filter(Boolean).join(' · ');

  if (variant === 'compact') {
    return (
      <Card as="article" interactive className="flex flex-col">
        {images.length > 0 && (
          <img
            src={images[0]}
            alt={`${title} screenshot`}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}
        <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{title}</h3>
        {meta && <p className="text-xs text-gray-500 dark:text-gray-400">{meta}</p>}
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{summary}</p>
        <TagList tags={tags.slice(0, COMPACT_TAG_LIMIT)} />
        <p className="mt-auto pt-4 text-sm font-medium">
          <Link to={`/${category}`} aria-label={`Read the case study: ${title}`}>
            Read the case study
          </Link>
        </p>
      </Card>
    );
  }

  const links = studyLinks(study);
  const sections = [
    { term: 'Problem', text: problem },
    { term: 'What I built', text: built },
    { term: 'Outcome', text: outcome },
  ];

  return (
    <Card as="article">
      <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">{title}</h3>
      {meta && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{meta}</p>}

      <dl className="mt-5 grid gap-5 lg:grid-cols-3 lg:gap-8">
        {sections.map(({ term, text }) => (
          <div key={term}>
            <dt className="font-display text-xs font-semibold uppercase tracking-widest text-accent-700 dark:text-accent-300">
              {term}
            </dt>
            <dd className="mt-1.5 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-200">{text}</dd>
          </div>
        ))}
      </dl>

      <TagList tags={tags} />

      {links.length > 0 && (
        <p className="flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm font-medium">
          {links.map((link) => (
            <a key={link.href} href={link.href} {...externalLink}>
              {link.label}
            </a>
          ))}
        </p>
      )}

      {images.length > 0 && (
        <div className={clsx('mt-6', images.length === 1 && 'max-w-2xl')}>
          <Collage imgs={images} />
        </div>
      )}
    </Card>
  );
}
