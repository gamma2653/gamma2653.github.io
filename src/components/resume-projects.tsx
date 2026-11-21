import { dateRange, type ResumeProject } from '../data/resume';
import Emphasis from './emphasis';

type ResumeProjectsProps = {
  projects: ResumeProject[];
}

/** The resume's Projects section: name, tagline and repositories on one line, then bullets. */
export default function ResumeProjects({ projects }: ResumeProjectsProps) {
  return (
    <div className="space-y-3">
      {projects.map((project) => {
        const dates = dateRange(project);
        return (
          <article key={project.name} className="print:break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h4 className="font-bold">
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
                {' - '}
                {project.tagline}{' '}
                <span className="font-normal">
                  (Git:{' '}
                  {project.repos.map((repo, index) => (
                    <span key={repo.url}>
                      {index > 0 && ' | '}
                      <a href={repo.url} target="_blank" rel="noopener noreferrer">
                        {repo.label}
                      </a>
                    </span>
                  ))}
                  )
                </span>
              </h4>
              {dates && <p className="font-bold">{dates}</p>}
            </div>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {project.highlights.map((highlight) => (
                <li key={highlight}>
                  <Emphasis text={highlight} />
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
