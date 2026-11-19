import { Link } from '@tanstack/react-router';
import { projectsForSkill, skillGroups, type Skill } from '../data/skills';
import Tag from './tag';

/** Project links shown per skill before collapsing into "+N more". */
const MAX_PROJECT_LINKS = 4;

function SkillItem({ skill }: { skill: Skill }) {
  const demos = projectsForSkill(skill);
  const shown = demos.slice(0, MAX_PROJECT_LINKS);
  const hidden = demos.length - shown.length;
  const roles = skill.roles ?? [];

  return (
    <li className="flex flex-wrap items-baseline gap-x-2 gap-y-1 print:break-inside-avoid">
      <Tag className="print:border-gray-400 print:bg-transparent print:text-black">{skill.name}</Tag>
      {shown.length > 0 && (
        <span className="text-sm text-gray-700 dark:text-gray-300 print:text-black">
          {shown.map((project, index) => (
            <span key={project.id}>
              {index > 0 && ', '}
              <Link to={`/${project.category}`}>{project.title}</Link>
            </span>
          ))}
          {hidden > 0 && ` +${hidden} more`}
        </span>
      )}
      {roles.length > 0 && (
        <span className="text-sm text-gray-600 dark:text-gray-400 print:text-black">
          {shown.length > 0 && '· '}used at {roles.join(', ')}
        </span>
      )}
    </li>
  );
}

/**
 * Skills grouped by kind. Each skill is followed by its evidence: the projects
 * tagged with it (linked to their category page) and the roles it was used in.
 */
export default function SkillGroups() {
  return (
    <div className="space-y-6 print:space-y-4">
      {skillGroups.map((group) => (
        <div key={group.name}>
          <h3 className="font-display text-lg sm:text-xl font-bold mb-3">{group.name}</h3>
          <ul aria-label={group.name} className="space-y-2">
            {group.skills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
