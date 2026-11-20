import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import PageHeader from '../../src/components/page-header';

describe('PageHeader', () => {
  test('renders the title as an h1 in the display font', () => {
    render(<PageHeader title="About Me" />);
    const heading = screen.getByRole('heading', { level: 1, name: 'About Me' });
    expect(heading).toHaveClass('font-display');
  });

  test('is left-aligned and constrained to prose width', () => {
    render(<PageHeader title="About Me" />);
    const header = screen.getByRole('heading', { level: 1 }).parentElement as HTMLElement;
    expect(header.tagName).toBe('HEADER');
    expect(header).toHaveClass('max-w-prose');
    expect(header).not.toHaveClass('text-center');
  });

  test('renders no lead block without children', () => {
    render(<PageHeader title="About Me" />);
    const header = screen.getByRole('heading', { level: 1 }).parentElement as HTMLElement;
    expect(header.children).toHaveLength(1);
  });

  test('renders children as the lead block', () => {
    render(<PageHeader title="About Me"><p>Lead text</p></PageHeader>);
    expect(screen.getByText('Lead text').parentElement).toHaveClass('mt-3', 'space-y-2');
  });
});
