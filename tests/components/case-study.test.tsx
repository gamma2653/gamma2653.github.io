import { expect, test, describe } from '@rstest/core';
import { render, screen, within } from '@testing-library/react';
import CaseStudyCard from '../../src/components/case-study';
import type { CaseStudy } from '../../src/data/case-studies';
import { renderWithRouter } from '../test-utils';

const study: CaseStudy = {
  id: 'sample',
  title: 'Sample Study',
  subtitle: 'Sample Org',
  category: 'robotics',
  year: '2020 - 2023',
  summary: 'One sentence about the sample study.',
  problem: 'The problem statement.',
  built: 'The thing that was built.',
  outcome: 'The measured outcome.',
  // Real project ids, so the card can look up their repositories.
  projectIds: ['c1c0-scheduler', 'r2-object-detection'],
  tags: ['Python', 'TensorFlow', 'Computer Vision', 'Makefile', 'TensorRT'],
  images: ['/one.webp', '/two.webp'],
  links: [{ label: 'Team page', href: 'https://example.com/team' }],
};

describe('CaseStudyCard (full)', () => {
  test('renders an article with the title, subtitle and year', () => {
    render(<CaseStudyCard study={study} />);
    const card = screen.getByRole('article');
    expect(within(card).getByRole('heading', { level: 3, name: 'Sample Study' })).toBeInTheDocument();
    expect(within(card).getByText('Sample Org · 2020 - 2023')).toBeInTheDocument();
  });

  test('shows Problem, What I built and Outcome as a description list', () => {
    const { container } = render(<CaseStudyCard study={study} variant="full" />);
    const terms = [...container.querySelectorAll('dl dt')].map((dt) => dt.textContent);
    expect(terms).toEqual(['Problem', 'What I built', 'Outcome']);
    const details = [...container.querySelectorAll('dl dd')].map((dd) => dd.textContent);
    expect(details).toEqual(['The problem statement.', 'The thing that was built.', 'The measured outcome.']);
    expect(screen.getByText('The measured outcome.')).toBeInTheDocument();
  });

  test('renders every tag', () => {
    render(<CaseStudyCard study={study} />);
    const items = within(screen.getByRole('list', { name: 'Technologies' })).getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(study.tags);
  });

  test('links to the covered repositories and the study links in a new tab', () => {
    render(<CaseStudyCard study={study} />);
    const expected: Array<[string, string]> = [
      ['C1C0 Scheduler repository', 'https://github.com/cornell-cup/c1c0-scheduler'],
      ['R2 Object Detection repository', 'https://github.com/cornell-cup/r2-object_detection'],
      ['Team page', 'https://example.com/team'],
    ];
    expect(screen.getAllByRole('link')).toHaveLength(expected.length);
    for (const [name, href] of expected) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('shows the screenshots as a collage', () => {
    render(<CaseStudyCard study={study} />);
    const images = screen.getAllByRole('img');
    expect(images.map((img) => img.getAttribute('src'))).toEqual(['/one.webp', '/two.webp']);
  });

  test('renders no collage without images', () => {
    render(<CaseStudyCard study={{ ...study, images: undefined }} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText('No images to display.')).not.toBeInTheDocument();
  });
});

describe('CaseStudyCard (compact)', () => {
  test('shows the title, summary and a lazy thumbnail, not the full write-up', async () => {
    renderWithRouter(<CaseStudyCard study={study} variant="compact" />);
    const card = await screen.findByRole('article');
    expect(within(card).getByRole('heading', { level: 3, name: 'Sample Study' })).toBeInTheDocument();
    expect(within(card).getByText('One sentence about the sample study.')).toBeInTheDocument();
    expect(within(card).queryByText('Problem')).not.toBeInTheDocument();
    expect(within(card).queryByText('The measured outcome.')).not.toBeInTheDocument();

    const images = within(card).getAllByRole('img');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', '/one.webp');
    expect(images[0]).toHaveAttribute('loading', 'lazy');
  });

  test('shows at most four tags', async () => {
    renderWithRouter(<CaseStudyCard study={study} variant="compact" />);
    const list = await screen.findByRole('list', { name: 'Technologies' });
    const items = within(list).getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(study.tags.slice(0, 4));
  });

  test('links to the category route', async () => {
    renderWithRouter(<CaseStudyCard study={study} variant="compact" />);
    const link = await screen.findByRole('link', { name: /Read the case study/ });
    expect(link).toHaveTextContent('Read the case study');
    expect(link).toHaveAttribute('href', '/robotics');
    expect(link).not.toHaveAttribute('target');
  });
});
