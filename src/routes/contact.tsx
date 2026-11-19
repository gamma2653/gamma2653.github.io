import { pageTitle } from '../lib/site';
import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import { LINKS } from '../data/links';
import Card from '../components/card';
import PageHeader from '../components/page-header';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
  head: () => ({ meta: [{ title: pageTitle('Contact') }] }),
})

const secondaryOptions = [
  {
    name: 'LinkedIn',
    href: LINKS.linkedin,
    description: 'Connect or message me professionally.',
  },
  {
    name: 'GitHub',
    href: LINKS.github,
    description: 'Browse my code or open an issue.',
  },
];

function RouteComponent() {
  return (
    <Page>
      <PageHeader title="Get in Touch">
        <p>
          I'd love to hear from you! Pick whichever option works best and I'll get back to you as soon as possible.
        </p>
      </PageHeader>

      <ul className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card as="li" interactive className="relative border-accent-500 dark:border-accent-400">
          <a
            href={LINKS.contactForm}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg sm:text-xl font-semibold no-underline after:absolute after:inset-0 after:rounded-xl"
          >
            Send me a message
          </a>
          <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            A short contact form, hosted on Google Forms. Opens in a new tab.
          </p>
        </Card>

        {secondaryOptions.map((option) => (
          <Card key={option.name} as="li" interactive className="relative">
            <a
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-semibold no-underline text-gray-900 hover:text-accent-700 dark:text-white dark:hover:text-accent-300 after:absolute after:inset-0 after:rounded-xl"
            >
              {option.name}
            </a>
            <p className="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {option.description}
            </p>
          </Card>
        ))}
      </ul>
    </Page>
  )
}
