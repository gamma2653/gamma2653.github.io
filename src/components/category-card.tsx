import { Link } from '@tanstack/react-router';
import { CATEGORY_LABELS, projectsByCategory, type ProjectCategory } from '../data/projects';
import Card from './card';

type CategoryCardProps = {
  category: ProjectCategory;
  image: string;
}

/** Entry point to a project category page: image, label and project count. */
export default function CategoryCard({ category, image }: CategoryCardProps) {
  const count = projectsByCategory(category).length;

  return (
    <Link to={`/${category}`} className="group grid min-w-0 no-underline text-inherit hover:text-inherit">
      <Card interactive>
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-video w-full rounded-lg object-cover"
        />
        <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-accent-700 dark:group-hover:text-accent-300">
          {CATEGORY_LABELS[category]}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {count} {count === 1 ? 'project' : 'projects'}
        </p>
      </Card>
    </Link>
  );
}
