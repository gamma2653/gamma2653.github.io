type PageProps = {
  children: React.ReactNode;
  // className?: string;
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <main className="w-full max-w-5xl mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 motion-safe:animate-page-in">
        {children}
      </main>
      <footer className="print:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Christopher De Jesus. All rights reserved.</p>
          <p className="mt-1 text-xs">Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
