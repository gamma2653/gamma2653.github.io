import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import ExperienceList from '../../src/components/experience-list';
import type { Role } from '../../src/data/resume';

const roles: Role[] = [
  {
    title: 'Staff Engineer',
    company: 'Example Co',
    url: 'https://example.com',
    location: 'Springfield',
    start: 'Jan 2024',
    end: 'Present',
    partTime: true,
    highlights: ['Did one thing.', 'Did another thing.'],
  },
  { title: 'Lab Assistant', company: 'Some Lab', highlights: ['Helped out.'] },
];

describe('ExperienceList', () => {
  test('renders one article per role with title, dates and highlights', () => {
    render(<ExperienceList roles={roles} />);
    const [first, second] = screen.getAllByRole('article');

    expect(within(first).getByRole('heading', { level: 3, name: 'Staff Engineer' })).toBeInTheDocument();
    expect(within(first).getByText('Jan 2024 – Present')).toBeInTheDocument();
    expect(within(first).getByText(/Springfield/)).toHaveTextContent('part-time');
    expect(within(first).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Did one thing.',
      'Did another thing.',
    ]);

    expect(within(second).getByRole('heading', { level: 3, name: 'Lab Assistant' })).toBeInTheDocument();
    expect(within(second).getByText('Some Lab')).toBeInTheDocument();
    expect(second).not.toHaveTextContent('–');
    expect(second).not.toHaveTextContent('part-time');
  });

  test('links the company only when it has a url', () => {
    render(<ExperienceList roles={roles} />);
    const link = screen.getByRole('link', { name: 'Example Co' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByRole('link', { name: 'Some Lab' })).not.toBeInTheDocument();
  });

  test('cards print flat and are not hidden behind a scroll-in reveal', () => {
    render(<ExperienceList roles={roles} />);
    for (const card of screen.getAllByRole('article')) {
      expect(card).toHaveClass('print:shadow-none', 'print:border-0', 'print:p-0', 'print:break-inside-avoid');
      expect(card).not.toHaveAttribute('data-revealed');
    }
  });
});
