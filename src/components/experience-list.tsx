import { dateRange, type Role } from '../data/resume';
import Emphasis from './emphasis';

type ExperienceListProps = {
  roles: Role[];
}

function qualifier({ partTime, contract }: Role): string | undefined {
  if (partTime) return 'Part-time';
  if (contract) return 'Contract';
  return undefined;
}

/** Resume roles, each laid out as in the resume document: a title line with the dates opposite, then bullets. */
export default function ExperienceList({ roles }: ExperienceListProps) {
  return (
    <div className="space-y-3">
      {roles.map((role) => {
        const dates = dateRange(role);
        const note = qualifier(role);
        return (
          <article key={`${role.title}-${role.company}`} className="print:break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h4 className="font-bold">
                <em>{role.title}</em>
                {note && <em className="font-normal"> ({note})</em>}
                {', '}
                {role.url ? (
                  <a href={role.url} target="_blank" rel="noopener noreferrer">
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
                {role.location && <>, {role.location}</>}
              </h4>
              {dates && <p className="font-bold">{dates}</p>}
            </div>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {role.highlights.map((highlight) => (
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
