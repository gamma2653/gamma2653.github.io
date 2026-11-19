import { Link, useRouterState } from '@tanstack/react-router';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import favicon from '../assets/images/favicon.png';
import faviconDark from '../assets/images/favicon_darkmode.png';
import ThemeToggle from './theme-toggle';

const categories = [
  { to: '/software', label: 'Software' },
  { to: '/robotics', label: 'Robotics' },
  { to: '/academics', label: 'Academics' },
] as const;

// Active state comes from `data-status="active"`: TanStack's Link sets it (with
// aria-current="page") on the current route, and the Projects trigger sets it
// itself while one of the category pages is open.
const barLink =
  'inline-flex h-14 items-center gap-1 border-b-2 border-transparent text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 data-[status=active]:border-accent-600 dark:data-[status=active]:border-accent-400 data-[status=active]:text-accent-700 dark:data-[status=active]:text-accent-300';

const panelLink =
  'block rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 data-[status=active]:text-accent-700 dark:data-[status=active]:text-accent-300';

const mobileLink =
  'block border-l-2 border-transparent px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 data-[status=active]:border-accent-600 dark:data-[status=active]:border-accent-400 data-[status=active]:text-accent-700 dark:data-[status=active]:text-accent-300';

export default function Navbar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const projectsActive = categories.some(
    ({ to }) => pathname === to || pathname.startsWith(`${to}/`),
  );

  return (
    <Disclosure
      as="nav"
      aria-label="Main"
      className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur print:hidden"
    >
      {({ open }) => (
        <>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="flex items-center gap-2 text-gray-900 dark:text-gray-100 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <img src={favicon} alt="Logo" className="h-8 w-8 block dark:hidden" />
              <img src={faviconDark} alt="Logo" className="h-8 w-8 hidden dark:block" />
              <span className="hidden sm:inline font-display text-base font-semibold">
                Christopher De Jesus
              </span>
            </Link>

            <div className="flex items-center gap-2 md:gap-6">
              {/* Horizontal links from md: up */}
              <ul className="hidden md:flex items-center gap-6">
                <li>
                  <Link to="/about" className={barLink}>
                    About
                  </Link>
                </li>
                <Popover as="li" className="relative">
                  <PopoverButton
                    data-status={projectsActive ? 'active' : undefined}
                    className={clsx(barLink, 'group cursor-pointer')}
                  >
                    Projects
                    <ChevronDownIcon
                      className="h-4 w-4 transition-transform group-data-open:rotate-180"
                      aria-hidden="true"
                    />
                  </PopoverButton>
                  <PopoverPanel className="absolute right-0 top-full z-50 w-44 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1 shadow-lg">
                    {({ close }) => (
                      <ul>
                        {categories.map(({ to, label }) => (
                          <li key={to}>
                            <Link to={to} onClick={() => close()} className={panelLink}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </PopoverPanel>
                </Popover>
                <li>
                  <Link to="/contact" className={barLink}>
                    Contact
                  </Link>
                </li>
              </ul>

              <ThemeToggle />

              {/* Menu button below md */}
              <DisclosureButton className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </DisclosureButton>
            </div>
          </div>

          {/* Mobile menu panel: unmounted while closed */}
          <DisclosurePanel className="md:hidden border-t border-gray-200 dark:border-gray-800">
            {({ close }) => (
              <ul className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                {[{ to: '/about', label: 'About' }, ...categories, { to: '/contact', label: 'Contact' }].map(
                  ({ to, label }) => (
                    <li key={to}>
                      <Link to={to} onClick={() => close()} className={mobileLink}>
                        {label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            )}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
