import { projects, type Project } from './projects';

export type SkillGroupName = 'Languages' | 'Frameworks' | 'Tooling';

export type Skill = {
  name: string;
  /** Exact project tag string to match. Defaults to `name`. */
  tag?: string;
  /** Company names from resume.ts where the skill was used professionally. */
  roles?: string[];
};

const AROBOTICS = 'aRoboticsCompany';
const SAGA = 'Saga Healthcare Co';
const TCAT = 'Tompkins Consolidated Area Transit';

/**
 * Skills shown on the About page. Project evidence is never listed here: it
 * is computed from the tags in projects.ts by `projectsForSkill`. Set `roles`
 * only where a highlight in resume.ts names the technology.
 */
export const skillGroups: { name: SkillGroupName; skills: Skill[] }[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'Python', roles: [AROBOTICS, TCAT] },
      { name: 'TypeScript' },
      { name: 'Rust' },
      { name: 'C++' },
      { name: 'SQL', roles: [TCAT] },
      { name: 'Java' },
      { name: 'GDScript' },
    ],
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'FastAPI' },
      { name: 'React/React Native', tag: 'React' },
      { name: 'Next.js' },
      { name: 'SQLAlchemy/Postgres' },
      { name: 'Celery' },
      { name: 'TensorFlow' },
      { name: 'Godot' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    name: 'Tooling',
    skills: [
      { name: 'AWS', roles: [AROBOTICS, SAGA] },
      { name: 'Terraform', roles: [SAGA] },
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'GitHub Actions' },
      { name: 'Keycloak/OIDC', roles: [SAGA] },
      { name: 'Claude Code' },
    ],
  },
];

/** Projects whose tags include the skill's tag (or its name). */
export function projectsForSkill(skill: Skill): Project[] {
  const tag = skill.tag ?? skill.name;
  return projects.filter((project) => project.tags.includes(tag));
}
