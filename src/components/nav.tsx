import { Link } from '@tanstack/react-router';

import favicon from '../assets/images/favicon.png';
import faviconDark from '../assets/images/favicon_darkmode.png';
import { mergeClasses } from '../util';
import banner from '../assets/images/banner.png';
import bannerDark from '../assets/images/banner_darkmode.png';

type NavbarProps = {
  classNames?: {
    nav?: string;
    nav_ul?: string;
    nav_ul_li?: string;
  }
}

export default function Navbar(props: NavbarProps) {
  return (
    <nav className={mergeClasses("bg-white dark:bg-gray-800 shadow-md px-8 py-4 flex", props.classNames?.nav)}>
      <ul className={mergeClasses("flex w-full gap-16 items-center", props.classNames?.nav_ul)}>
        <li><Link to="/" className={mergeClasses("text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100", props.classNames?.nav_ul_li)}>Home</Link></li>
        <li><Link to="/about" className={mergeClasses("text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100", props.classNames?.nav_ul_li)}>About</Link></li>
        <li><Link to="/projects" className={mergeClasses("text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100", props.classNames?.nav_ul_li)}>Projects</Link></li>
        <li><Link to="/contact" className={mergeClasses("text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2", props.classNames?.nav_ul_li)}>
          <img src={favicon} alt="Contact" className="h-16 w-16 block dark:hidden"></img>
          <img src={faviconDark} alt="Contact" className="h-16 w-16 hidden dark:block"></img>
          <p>Contact</p>
        </Link></li>
        <li className="ml-auto">
          <img src={banner} alt="Banner" className="w-auto h-24 rounded-lg shadow-md block dark:hidden mb-0"></img>
          <img src={bannerDark} alt="Banner Dark Mode" className="w-auto h-24 rounded-lg shadow-md hidden dark:block mb-0"></img>
          <p className="text-sm text-gray-700 dark:text-gray-300">Built with React, TypeScript, and Tailwind CSS.</p>
        </li>
      </ul>
    </nav>
  )
}
