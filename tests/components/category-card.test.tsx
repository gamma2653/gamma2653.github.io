import { expect, test, describe } from '@rstest/core';
import { screen, within } from '@testing-library/react';
import CategoryCard from '../../src/components/category-card';
import { projectsByCategory } from '../../src/data/projects';
import { renderWithRouter } from '../test-utils';

describe('CategoryCard', () => {
  test('links to the category page without link styling on the whole card', async () => {
    renderWithRouter(<CategoryCard category="robotics" image="/robotics.webp" />);
    const link = await screen.findByRole('link', { name: /Robotics/ });
    expect(link).toHaveAttribute('href', '/robotics');
    expect(link).toHaveClass('no-underline', 'text-inherit');
  });

  test('renders the category label as a level-3 heading', async () => {
    renderWithRouter(<CategoryCard category="academics" image="/academics.webp" />);
    expect(await screen.findByRole('heading', { level: 3, name: 'Academics' })).toBeInTheDocument();
  });

  test('renders the project count from the data', async () => {
    renderWithRouter(<CategoryCard category="software" image="/software.webp" />);
    const link = await screen.findByRole('link', { name: /Software/ });
    const count = projectsByCategory('software').length;
    expect(count).toBeGreaterThan(1);
    expect(within(link).getByText(`${count} projects`)).toBeInTheDocument();
  });

  test('lazy-loads the image', async () => {
    renderWithRouter(<CategoryCard category="software" image="/software.webp" />);
    const link = await screen.findByRole('link', { name: /Software/ });
    const img = link.querySelector('img') as HTMLImageElement;
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('src', '/software.webp');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
