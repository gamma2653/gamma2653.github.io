import { expect, test, describe } from '@rstest/core';
import { fireEvent, render, screen, within } from '@testing-library/react';
import ProjectCard from '../../src/components/project-card';
import ProjectGrid from '../../src/components/project-grid';
import Tag from '../../src/components/tag';
import type { Project } from '../../src/data/projects';

const base: Project = {
  id: 'sample',
  title: 'Sample Project',
  tagline: 'A sample tagline',
  blurb: 'A short description of the sample project.',
  category: 'software',
  tags: ['Python', 'React'],
  year: '2025 - present',
  org: 'Sample Org',
  repo: 'https://github.com/example/sample',
  links: [{ label: 'Docs', href: 'https://example.com/docs' }],
  images: ['/one.webp', '/two.webp', '/three.webp'],
};

describe('ProjectCard', () => {
  test('renders an article with title, secondary text and blurb', () => {
    render(<ProjectCard project={base} />);
    const card = screen.getByRole('article');
    expect(within(card).getByRole('heading', { level: 3, name: 'Sample Project' })).toBeInTheDocument();
    expect(within(card).getByText('A sample tagline')).toBeInTheDocument();
    expect(within(card).getByText(/Sample Org/)).toBeInTheDocument();
    expect(within(card).getByText(/2025 - present/)).toBeInTheDocument();
    expect(within(card).getByText('A short description of the sample project.')).toBeInTheDocument();
  });

  test('renders tags as a Technologies list', () => {
    render(<ProjectCard project={base} />);
    const list = screen.getByRole('list', { name: 'Technologies' });
    const items = within(list).getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(['Python', 'React']);
  });

  test('links the title and a Repository link to the repo in a new tab', () => {
    render(<ProjectCard project={base} />);
    const titleLink = screen.getByRole('link', { name: 'Sample Project' });
    const repoLink = screen.getByRole('link', { name: 'Sample Project repository' });
    expect(repoLink).toHaveTextContent('Repository');
    for (const link of [titleLink, repoLink]) {
      expect(link).toHaveAttribute('href', 'https://github.com/example/sample');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('renders extra links as external links', () => {
    render(<ProjectCard project={base} />);
    const docs = screen.getByRole('link', { name: 'Docs' });
    expect(docs).toHaveAttribute('href', 'https://example.com/docs');
    expect(docs).toHaveAttribute('target', '_blank');
    expect(docs).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('has no title or repository link without a repo', () => {
    render(<ProjectCard project={{ ...base, repo: undefined, links: undefined }} />);
    expect(screen.getByRole('heading', { name: 'Sample Project' })).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  test('lazy-loads the thumbnail and the strip thumbnails', () => {
    render(<ProjectCard project={base} />);
    const thumbnail = screen.getByAltText('Sample Project screenshot 1');
    expect(thumbnail).toHaveAttribute('src', '/one.webp');
    expect(thumbnail).toHaveAttribute('loading', 'lazy');
    expect(thumbnail).toHaveClass('object-cover');

    const strip = screen.getByRole('list', { name: 'Screenshots' });
    const stripImages = within(strip).getAllByRole('img');
    expect(stripImages.map((img) => img.getAttribute('alt'))).toEqual([
      'Sample Project screenshot 2',
      'Sample Project screenshot 3',
    ]);
    expect(screen.queryByTestId('project-thumbnail-placeholder')).not.toBeInTheDocument();
  });

  test('shows no strip for a single image', () => {
    render(<ProjectCard project={{ ...base, images: ['/one.webp'] }} />);
    expect(screen.getByAltText('Sample Project screenshot 1')).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Screenshots' })).not.toBeInTheDocument();
  });

  test('shows a placeholder with the category label when there are no images', () => {
    render(<ProjectCard project={{ ...base, images: undefined, category: 'robotics' }} />);
    expect(screen.getByTestId('project-thumbnail-placeholder')).toHaveTextContent('Robotics');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('clicking a thumbnail opens the modal on that image', async () => {
    render(<ProjectCard project={base} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'View Sample Project screenshot 2' }));

    const dialog = await screen.findByRole('dialog');
    const enlarged = within(dialog).getByRole('img');
    expect(enlarged).toHaveAttribute('src', '/two.webp');
    expect(enlarged).toHaveAttribute('alt', 'Sample Project screenshot 2');
  });

  test('clicking the main thumbnail opens the modal on the first image', async () => {
    render(<ProjectCard project={base} />);
    fireEvent.click(screen.getByRole('button', { name: 'View Sample Project screenshot 1' }));
    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', '/one.webp');
  });
});

describe('ProjectGrid', () => {
  test('renders one card per project in a responsive grid', () => {
    render(<ProjectGrid projects={[base, { ...base, id: 'other', title: 'Other Project' }]} />);
    expect(screen.getAllByRole('article')).toHaveLength(2);
    const grid = screen.getAllByRole('list')[0];
    expect(grid).toHaveClass('grid', 'gap-6', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });
});

describe('Tag', () => {
  test('renders a rounded chip and merges className', () => {
    render(<Tag className="custom-tag">Python</Tag>);
    expect(screen.getByText('Python')).toHaveClass(
      'rounded-full', 'border', 'px-2.5', 'py-0.5', 'text-xs', 'font-medium', 'custom-tag',
    );
  });
});
