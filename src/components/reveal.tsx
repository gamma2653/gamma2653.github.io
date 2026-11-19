import clsx from 'clsx';
import { useInView } from '../lib/use-in-view';

type RevealProps = {
  as?: React.ElementType;
  delayMs?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Fades and slides its content in the first time it scrolls into view.
 * The hidden state only applies under `motion-safe:`, and content is shown
 * immediately when IntersectionObserver is unavailable, so it can never
 * stay invisible.
 */
export default function Reveal({ as: Tag = 'div', delayMs, className, children }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>({ rootMargin: '0px 0px -10% 0px' });

  return (
    <Tag
      ref={ref}
      data-revealed={inView ? 'true' : 'false'}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={clsx(
        'motion-safe:transition motion-safe:duration-500 motion-safe:ease-out',
        inView ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-4',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
