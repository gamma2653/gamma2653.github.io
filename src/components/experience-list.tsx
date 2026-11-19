import type { Role } from '../data/resume';
import Card from './card';

type ExperienceListProps = {
  roles: Role[];
}

function dateRange({ start, end }: Role): string {
  return [start, end].filter(Boolean).join(' – ');
}

export default function ExperienceList({ roles }: ExperienceListProps) {
  return (
    <div className="space-y-4 sm:space-y-6 print:space-y-4">
      {roles.map((role) => {
        const dates = dateRange(role);
        return (
          // No scroll-in reveal: cards below the fold must not print invisible.
          <Card
            key={`${role.title}-${role.company}`}
            as="article"
            reveal={false}
            className="print:shadow-none print:border-0 print:p-0 print:bg-transparent print:break-inside-avoid"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-display text-lg sm:text-xl font-bold">{role.title}</h3>
              {dates && (
                <p className="text-sm text-gray-600 dark:text-gray-400 print:text-black">{dates}</p>
              )}
            </div>
            <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400 print:text-black">
              {role.url ? (
                <a href={role.url} target="_blank" rel="noopener noreferrer">
                  {role.company}
                </a>
              ) : (
                role.company
              )}
              {role.location && <> · {role.location}</>}
              {role.partTime && <> · part-time</>}
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm sm:text-base text-gray-700 dark:text-gray-300 print:text-black">
              {role.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </Card>
        );
      })}
    </div>
  );
}
