import { useState } from 'react';
import { CATEGORY_LABELS, type Project } from '../data/projects';
import Card from './card';
import ImageModal from './image-modal';
import Tag from './tag';

type ProjectCardProps = {
  project: Project;
}

const externalLink = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, tagline, blurb, category, tags, year, org, repo, links = [], images = [] } = project;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const imageAlt = (index: number) => `${title} screenshot ${index + 1}`;
  const meta = [org, year].filter(Boolean).join(' · ');

  return (
    <Card as="article" interactive className="flex flex-col">
      {images.length > 0 ? (
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          aria-label={`View ${imageAlt(0)}`}
          className="block w-full cursor-zoom-in overflow-hidden rounded-lg"
        >
          <img
            src={images[0]}
            alt={imageAlt(0)}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full object-cover"
          />
        </button>
      ) : (
        <div
          data-testid="project-thumbnail-placeholder"
          aria-hidden="true"
          className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 font-display text-sm font-medium uppercase tracking-widest text-gray-600 dark:text-gray-300"
        >
          {CATEGORY_LABELS[category]}
        </div>
      )}

      {images.length > 1 && (
        <ul aria-label="Screenshots" className="mt-2 flex flex-wrap gap-2">
          {images.slice(1).map((image, offset) => {
            const index = offset + 1;
            return (
              <li key={image}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-label={`View ${imageAlt(index)}`}
                  className="block cursor-zoom-in overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 hover:border-accent-400"
                >
                  <img
                    src={image}
                    alt={imageAlt(index)}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-14 object-cover"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug">
        {repo ? (
          <a href={repo} {...externalLink} className="no-underline hover:underline">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      {tagline && <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{tagline}</p>}
      {meta && <p className="text-xs text-gray-500 dark:text-gray-400">{meta}</p>}

      <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{blurb}</p>

      <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>

      {(repo || links.length > 0) && (
        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm font-medium">
          {repo && (
            <a href={repo} {...externalLink} aria-label={`${title} repository`}>
              Repository
            </a>
          )}
          {links.map((link) => (
            <a key={link.href} href={link.href} {...externalLink}>
              {link.label}
            </a>
          ))}
        </p>
      )}

      <ImageModal
        isOpen={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        imageSrc={openIndex !== null ? images[openIndex] : null}
        imageAlt={openIndex !== null ? imageAlt(openIndex) : ''}
      />
    </Card>
  );
}
