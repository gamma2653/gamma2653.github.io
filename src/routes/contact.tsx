import { createFileRoute } from '@tanstack/react-router'
import Page from '../components/page';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">Get in Touch</h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center mb-6 sm:mb-8 leading-relaxed">
          I'd love to hear from you! Fill out the form below and I'll get back to you as soon as possible.
        </p>

        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScIwxov4hnAChB-_kTPSdpcfdKtcg8JFmY09H5j781FYYeqXg/viewform?embedded=true"
            className="w-full border-0"
            style={{ minHeight: '1200px', height: '100vh' }}
            title="Contact Form"
          >
            Loading contact form…
          </iframe>
        </div>

        <p className="text-sm sm:text-base text-center text-gray-600 dark:text-gray-400 mt-6 sm:mt-8">
          You can also reach me on{' '}
          <a
            href="https://www.linkedin.com/in/cdejesus26/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
          {' '}or{' '}
          <a
            href="https://github.com/gamma2653"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </Page>
  )
}
