import type { Project } from '../data/projects';
import Tag from './tag';

type EarlierWorkProps = {
  projects: Project[];
}

const externalLink = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** A compact row for older projects: no thumbnails and no cards. */
export default function EarlierWork({ projects }: EarlierWorkProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="earlier-work-heading" className="mt-10 sm:mt-12">
      <h2 id="earlier-work-heading" className="font-display text-xl sm:text-2xl font-bold mb-2">
        Earlier work
      </h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {projects.map(({ id, title, year, blurb, tags, repo }) => (
          <li key={id} className="py-3 sm:flex sm:items-baseline sm:gap-4">
            <p className="shrink-0 sm:w-56 font-display font-semibold">
              {repo ? (
                <a href={repo} {...externalLink}>
                  {title}
                </a>
              ) : (
                title
              )}
              {year && <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">{year}</span>}
            </p>
            <p className="min-w-0 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{blurb}</p>
            <ul aria-label={`${title} technologies`} className="mt-2 sm:mt-0 flex shrink-0 flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
