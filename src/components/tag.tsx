import clsx from 'clsx';

type TagProps = {
  className?: string;
  children?: React.ReactNode;
}

/** Small rounded chip used for technology labels. */
export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium',
        'border-accent-200 bg-accent-50 text-accent-800',
        'dark:border-accent-800 dark:bg-accent-950 dark:text-accent-200',
        className,
      )}
    >
      {children}
    </span>
  );
}
