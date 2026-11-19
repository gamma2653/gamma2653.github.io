import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';
import { LINKS } from '../data/links';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">Get in Touch</h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center mb-6 sm:mb-8 leading-relaxed">
          I'd love to hear from you! Pick whichever option works best and I'll get back to you as soon as possible.
        </p>

        <div className="space-y-4">
          <a
            href={LINKS.contactForm}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-800 p-5 sm:p-6 no-underline hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="block text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400">
              Send me a message
            </span>
            <span className="block mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              A short contact form, hosted on Google Forms. Opens in a new tab.
            </span>
          </a>

          {secondaryOptions.map((option) => (
            <a
              key={option.name}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 sm:p-6 no-underline hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="block text-lg font-semibold text-gray-900 dark:text-white">
                {option.name}
              </span>
              <span className="block mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {option.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </Page>
  )
}
