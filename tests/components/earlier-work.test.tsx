import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import EarlierWork from '../../src/components/earlier-work';
import type { Project } from '../../src/data/projects';

const older: Project = {
  id: 'older',
  title: 'Older Project',
  blurb: 'One line about the older project.',
  category: 'software',
  tags: ['Java', 'Maven'],
  year: '2016',
  repo: 'https://github.com/example/older',
  images: ['/older.webp'],
};

const noRepo: Project = {
  id: 'no-repo',
  title: 'Unpublished Project',
  blurb: 'One line about the unpublished project.',
  category: 'software',
  tags: ['Java'],
};

describe('EarlierWork', () => {
  test('renders an "Earlier work" h2 that labels the section', () => {
    render(<EarlierWork projects={[older]} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Earlier work' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Earlier work' })).toBeInTheDocument();
  });

  test('lists each project with its year, blurb and tags', () => {
    render(<EarlierWork projects={[older, noRepo]} />);
    const section = within(screen.getByRole('region', { name: 'Earlier work' }));
    expect(section.getByText('2016')).toBeInTheDocument();
    expect(section.getByText('One line about the older project.')).toBeInTheDocument();
    expect(section.getByText('One line about the unpublished project.')).toBeInTheDocument();
    const tags = within(section.getByRole('list', { name: 'Older Project technologies' })).getAllByRole('listitem');
    expect(tags.map((tag) => tag.textContent)).toEqual(['Java', 'Maven']);
  });

  test('links the title to the repository in a new tab', () => {
    render(<EarlierWork projects={[older, noRepo]} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Older Project');
    expect(links[0]).toHaveAttribute('href', 'https://github.com/example/older');
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('Unpublished Project')).toBeInTheDocument();
  });

  test('uses neither thumbnails nor cards', () => {
    render(<EarlierWork projects={[older]} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  test('renders nothing for an empty list', () => {
    const { container } = render(<EarlierWork projects={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
