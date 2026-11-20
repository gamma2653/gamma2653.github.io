type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="mb-8 sm:mb-10 max-w-prose">
      <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
      {children && (
        <div className="mt-3 space-y-2 text-base sm:text-lg text-gray-600 dark:text-gray-300">{children}</div>
      )}
    </header>
  );
}
