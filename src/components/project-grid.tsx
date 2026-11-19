import type { Project } from '../data/projects';
import ProjectCard from './project-card';

type ProjectGridProps = {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id} className="grid min-w-0">
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
