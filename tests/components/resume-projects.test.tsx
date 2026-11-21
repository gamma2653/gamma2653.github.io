import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import ResumeProjects from '../../src/components/resume-projects';
import type { ResumeProject } from '../../src/data/resume';

const projects: ResumeProject[] = [
  {
    name: 'Widget',
    url: 'https://example.com/widget',
    tagline: 'A Thing That Spins',
    repos: [
      { label: 'widget-core', url: 'https://example.com/core' },
      { label: 'widget-ui', url: 'https://example.com/ui' },
    ],
    start: 'Jan 2024',
    end: 'Present',
    highlights: ['Made it **twice** as fast.'],
  },
  { name: 'Gadget', tagline: 'Another Thing', repos: [{ label: 'gadget', url: 'https://example.com/gadget' }], highlights: ['Built it.'] },
];

describe('ResumeProjects', () => {
  test('renders name, tagline, repositories, dates and bullets per project', () => {
    render(<ResumeProjects projects={projects} />);
    const [first, second] = screen.getAllByRole('article');

    expect(within(first).getByRole('heading', { level: 4 })).toHaveTextContent(
      'Widget - A Thing That Spins (Git: widget-core | widget-ui)',
    );
    expect(within(first).getByText('Jan 2024 – Present')).toBeInTheDocument();
    expect(within(first).getByText('twice').tagName).toBe('STRONG');
    for (const [name, href] of [
      ['Widget', 'https://example.com/widget'],
      ['widget-core', 'https://example.com/core'],
      ['widget-ui', 'https://example.com/ui'],
    ]) {
      const link = within(first).getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }

    expect(within(second).queryByRole('link', { name: 'Gadget' })).not.toBeInTheDocument();
    expect(second).not.toHaveTextContent('–');
  });
});
