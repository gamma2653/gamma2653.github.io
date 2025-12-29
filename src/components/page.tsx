import Head from './head';
import Navbar from './nav';

type PageProps = {
  children: React.ReactNode;
  // className?: string;
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Head title="Christopher De Jesus's Portfolio" />
      <Navbar />
      <main className="px-16 py-8">
        {children}
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 fixed bottom-2 left-0 right-0">
          All rights reserved © Christopher De Jesus 2025
        </footer>
      </main>
    </div>
  );
};

export default Page;
