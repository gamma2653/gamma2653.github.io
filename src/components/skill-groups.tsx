import { skillGroups } from '../data/skills';

/** The resume's skills section: one line per group, as in the resume document. */
export default function SkillGroups() {
  return (
    <ul className="list-disc space-y-0.5 pl-5">
      {skillGroups.map((group) => (
        <li key={group.name}>
          <em>{group.name}</em>: <strong>{group.skills.join(', ')}</strong>
        </li>
      ))}
    </ul>
  );
}
