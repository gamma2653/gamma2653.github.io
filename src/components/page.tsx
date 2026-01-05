type PageProps = {
  children: React.ReactNode;
  // className?: string;
}

const Page = ({ children }: PageProps) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8">
        {children}
        <footer className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 fixed bottom-2 left-0 right-0">
          All rights reserved © Christopher De Jesus 2025
        </footer>
      </main>
    </div>
  );
};

export default Page;
