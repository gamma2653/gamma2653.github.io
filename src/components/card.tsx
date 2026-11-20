import clsx from 'clsx';
import Reveal from './reveal';

type CardProps = {
  as?: 'div' | 'article' | 'section' | 'li';
  interactive?: boolean;
  reveal?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Bordered surface used for grouped content.
 *
 * `className` always lands on the surface. With `reveal` (the default) the
 * surface is wrapped in a `Reveal` that takes the `as` tag, so the scroll-in
 * transition and the hover lift never compete for the same element.
 */
export default function Card({
  as: Tag = 'div',
  interactive = false,
  reveal = true,
  className,
  children,
}: CardProps) {
  const surface = clsx(
    'rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 sm:p-6 shadow-sm',
    interactive &&
      'motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-1 hover:shadow-lg hover:border-accent-400',
    className,
  );

  if (!reveal) {
    return <Tag className={surface}>{children}</Tag>;
  }

  return (
    <Reveal as={Tag}>
      <div className={clsx('h-full', surface)}>{children}</div>
    </Reveal>
  );
}
