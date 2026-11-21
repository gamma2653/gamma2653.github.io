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
    highlights: ['Did **one** thing.', 'Did another thing.'],
  },
  { title: 'Lab Assistant', company: 'Some Lab', contract: true, highlights: ['Helped out.'] },
];

describe('ExperienceList', () => {
  test('renders one article per role with title, dates and highlights', () => {
    render(<ExperienceList roles={roles} />);
    const [first, second] = screen.getAllByRole('article');

    expect(within(first).getByRole('heading', { level: 4 })).toHaveTextContent(
      'Staff Engineer (Part-time), Example Co, Springfield',
    );
    expect(within(first).getByText('Jan 2024 – Present')).toBeInTheDocument();
    expect(within(first).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Did one thing.',
      'Did another thing.',
    ]);

    expect(within(second).getByRole('heading', { level: 4 })).toHaveTextContent('Lab Assistant (Contract), Some Lab');
    expect(second).not.toHaveTextContent('–');
    expect(second).not.toHaveTextContent('Part-time');
  });

  test('sets the marked phrases of a highlight in bold', () => {
    render(<ExperienceList roles={roles} />);
    const bold = screen.getByText('one');
    expect(bold.tagName).toBe('STRONG');
    expect(bold.closest('li')).toHaveTextContent('Did one thing.');
  });

  test('links the company only when it has a url', () => {
    render(<ExperienceList roles={roles} />);
    const link = screen.getByRole('link', { name: 'Example Co' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByRole('link', { name: 'Some Lab' })).not.toBeInTheDocument();
  });

  test('entries do not split across printed pages and are not hidden behind a scroll-in reveal', () => {
    render(<ExperienceList roles={roles} />);
    for (const entry of screen.getAllByRole('article')) {
      expect(entry).toHaveClass('print:break-inside-avoid');
      expect(entry).not.toHaveAttribute('data-revealed');
    }
  });
});
