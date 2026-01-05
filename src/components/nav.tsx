import { Link } from '@tanstack/react-router';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

import favicon from '../assets/images/favicon.png';
import faviconDark from '../assets/images/favicon_darkmode.png';
import banner from '../assets/images/banner.png';
import bannerDark from '../assets/images/banner_darkmode.png';

type NavbarProps = {
  classNames?: {
    nav?: string;
    nav_ul?: string;
    nav_ul_li?: string;
  }
}
const categories = ["software", "robotics", "academics"] as const;

export default function Navbar(props: NavbarProps) {
  return (
    <Disclosure as="nav" className={clsx("bg-white dark:bg-gray-800 shadow-md", props.classNames?.nav)}>
      {({ open }) => (
        <>
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo/Brand - visible on mobile */}
              <Link to="/" className="flex items-center gap-2 xl:hidden">
                <div className="flex items-center gap-2 xl:hidden">
                  <img src={favicon} alt="Logo" className="h-8 w-8 block dark:hidden" />
                  <img src={faviconDark} alt="Logo" className="h-8 w-8 hidden dark:block" />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <ul className={clsx("hidden xl:flex w-full gap-8 2xl:gap-16 items-center", props.classNames?.nav_ul)}>
                <li><Link to="/" className={clsx("text-xl 2xl:text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100", props.classNames?.nav_ul_li)}>Home</Link></li>
                <li><Link to="/about" className={clsx("text-xl 2xl:text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100", props.classNames?.nav_ul_li)}>About</Link></li>
                <li>
                  <Disclosure>
                    {({ open: projectsOpen }) => (
                      <>
                        <DisclosureButton className={clsx("text-xl 2xl:text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2", props.classNames?.nav_ul_li)}>
                          <p>Projects</p>
                          <ChevronDownIcon className={clsx('w-5 inline-block transition-transform', projectsOpen && 'rotate-180')} />
                        </DisclosureButton>
                        <DisclosurePanel className="absolute bg-white dark:bg-gray-600 shadow-md mt-2 rounded-md z-10">
                          <ul className="flex flex-col p-4 gap-2">
                            {categories.map((category) => (
                              <li key={category}>
                                <Link to={`/${category}`} className="text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                                  {category.charAt(0).toUpperCase() + category.slice(1)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                </li>
                <li>
                  <Link to="/contact" className={clsx("text-xl 2xl:text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2", props.classNames?.nav_ul_li)}>
                    <img src={favicon} alt="Contact" className="h-12 w-12 2xl:h-16 2xl:w-16 block dark:hidden" />
                    <img src={faviconDark} alt="Contact" className="h-12 w-12 2xl:h-16 2xl:w-16 hidden dark:block" />
                    <p>Contact</p>
                  </Link>
                </li>
                <li className="ml-auto">
                  <img src={banner} alt="Banner" className="w-auto h-20 2xl:h-24 rounded-lg shadow-md block dark:hidden mb-0" />
                  <img src={bannerDark} alt="Banner Dark Mode" className="w-auto h-20 2xl:h-24 rounded-lg shadow-md hidden dark:block mb-0" />
                  <p className="text-xs 2xl:text-sm text-gray-700 dark:text-gray-300">Built with React, TypeScript, and Tailwind CSS.</p>
                </li>
              </ul>

              {/* Mobile menu button */}
              <div className="xl:hidden">
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <DisclosurePanel className="xl:hidden">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About
              </Link>

              {/* Projects submenu */}
              <Disclosure>
                {({ open: projectsOpen }) => (
                  <>
                    <DisclosureButton className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span>Projects</span>
                      <ChevronDownIcon className={clsx('w-5 transition-transform', projectsOpen && 'rotate-180')} />
                    </DisclosureButton>
                    <DisclosurePanel className="pl-4 space-y-1">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          to={`/${category}`}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>

              <Link
                to="/contact"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img src={favicon} alt="Contact" className="h-6 w-6 block dark:hidden" />
                <img src={faviconDark} alt="Contact" className="h-6 w-6 hidden dark:block" />
                <span>Contact</span>
              </Link>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
