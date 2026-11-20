import clsx from 'clsx';

type PrintResumeButtonProps = {
  className?: string;
}

/**
 * Opens the browser print dialog. The About page's print styles reduce the
 * page to the resume section, so "Save as PDF" yields a resume.
 */
export default function PrintResumeButton({ className }: PrintResumeButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={clsx(
        'print:hidden inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium cursor-pointer',
        'bg-accent-700 text-white hover:bg-accent-800 dark:hover:bg-accent-600 transition-colors shadow-sm',
        className,
      )}
    >
      Print / save resume as PDF
    </button>
  );
}
