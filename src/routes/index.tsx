import { createFileRoute, Link } from '@tanstack/react-router'
import Page from '../components/page';
import CaseStudyCard from '../components/case-study';
import CategoryCard from '../components/category-card';
import { caseStudies } from '../data/case-studies';
import { LINKS } from '../data/links';
import type { ProjectCategory } from '../data/projects';
import { currentRoles } from '../data/resume';
// The only photograph of the owner in the repo. Swapping in a headshot is a one-import change.
import portrait from '../assets/images/butter_tasty.webp';
import storyboard from '../assets/images/portfolio/storyboard.webp';
import c1c0_collage from '../assets/images/portfolio/c1c0_collage.webp';
import bluestamp_collage from '../assets/images/portfolio/bluestamp_collage.webp';

const CATEGORY_ENTRIES: { category: ProjectCategory; image: string }[] = [
  { category: 'software', image: storyboard },
  { category: 'robotics', image: c1c0_collage },
  { category: 'academics', image: bluestamp_collage },
];

const externalLink = { target: '_blank', rel: 'noopener noreferrer' } as const;

const sectionHeading = 'font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6';
const button =
  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold no-underline transition-colors';

/** "Tagup", "Tagup and Saga Healthcare Co", "A, B and C" */
function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

const App = () => {
  const employers = currentRoles().map((role) => role.company);

  return (
    <Page>
      <section
        aria-labelledby="hero-title"
        className="grid items-center gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-12"
      >
        <div className="min-w-0">
          <h1 id="hero-title" className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Christopher De Jesus
          </h1>
          <p className="mt-4 max-w-prose text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-200">
            Software engineer at the intersection of cognition and computation.
          </p>
          {employers.length > 0 && (
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Currently at {joinNames(employers)}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/software"
              className={`${button} bg-accent-700 text-white shadow-md hover:bg-accent-800 hover:text-white dark:text-white dark:hover:bg-accent-600 dark:hover:text-white`}
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className={`${button} border border-accent-700 text-accent-800 hover:bg-accent-50 dark:border-accent-300 dark:text-accent-200 dark:hover:bg-gray-800`}
            >
              Contact
            </Link>
          </div>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
            <a href={LINKS.github} {...externalLink}>GitHub</a>
            <a href={LINKS.linkedin} {...externalLink}>LinkedIn</a>
            <Link to="/about">Resume</Link>
          </p>
        </div>
        <img
          src={portrait}
          alt="Christopher De Jesus hiking at Buttermilk Falls"
          width={800}
          height={800}
          loading="eager"
          decoding="async"
          className="aspect-[4/5] h-auto w-full max-w-xs justify-self-start rounded-2xl object-cover object-[85%_50%] shadow-lg md:max-w-none md:justify-self-end"
        />
      </section>

      <section aria-labelledby="featured-title" className="mt-12 sm:mt-16">
        <h2 id="featured-title" className={sectionHeading}>Featured projects</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <li key={study.id} className="grid min-w-0">
              <CaseStudyCard study={study} variant="compact" />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="areas-title" className="mt-12 sm:mt-16">
        <h2 id="areas-title" className={sectionHeading}>Browse by area</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ENTRIES.map(({ category, image }) => (
            <li key={category} className="grid min-w-0">
              <CategoryCard category={category} image={image} />
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
};


export const Route = createFileRoute('/')({
  component: App,

})
