import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import Card from '../../src/components/card';

describe('Card', () => {
  test('renders children on a div surface by default', () => {
    render(<Card reveal={false}>Body</Card>);
    const card = screen.getByText('Body');
    expect(card.tagName).toBe('DIV');
    expect(card).toHaveClass('rounded-xl', 'border', 'bg-white', 'dark:bg-gray-800', 'shadow-sm');
  });

  test('renders the requested element', () => {
    render(<Card as="article" reveal={false}>Body</Card>);
    expect(screen.getByText('Body').tagName).toBe('ARTICLE');
  });

  test('has no hover lift unless interactive', () => {
    render(<Card reveal={false}>Body</Card>);
    const card = screen.getByText('Body');
    expect(card).not.toHaveClass('hover:shadow-lg');
    expect(card).not.toHaveClass('motion-safe:hover:-translate-y-1');
  });

  test('adds motion-safe hover lift when interactive', () => {
    render(<Card interactive reveal={false}>Body</Card>);
    const card = screen.getByText('Body');
    expect(card).toHaveClass(
      'motion-safe:transition',
      'motion-safe:hover:-translate-y-1',
      'hover:shadow-lg',
      'hover:border-accent-400',
    );
    expect(card).not.toHaveClass('hover:-translate-y-1');
  });

  test('merges className onto the surface', () => {
    render(<Card reveal={false} className="custom-card">Body</Card>);
    expect(screen.getByText('Body')).toHaveClass('custom-card', 'rounded-xl');
  });

  test('wraps the surface in a Reveal that takes the `as` tag by default', () => {
    render(<Card as="li" interactive className="custom-card">Body</Card>);
    const surface = screen.getByText('Body');
    expect(surface).toHaveClass('custom-card', 'rounded-xl', 'hover:shadow-lg');
    const wrapper = surface.parentElement as HTMLElement;
    expect(wrapper.tagName).toBe('LI');
    // jsdom has no IntersectionObserver, so the content is revealed at once.
    expect(wrapper).toHaveAttribute('data-revealed', 'true');
    expect(surface).toBeVisible();
  });
});
