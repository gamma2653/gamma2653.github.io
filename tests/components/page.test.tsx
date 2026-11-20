import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import Page from '../../src/components/page';

describe('Page', () => {
  test('renders children', () => {
    render(<Page><p>Page content</p></Page>);
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  test('renders footer with the current year, copyright and owner', () => {
    render(<Page>content</Page>);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(String(new Date().getFullYear()));
    expect(footer).toHaveTextContent(/All rights reserved/);
    expect(footer).toHaveTextContent(/Christopher De Jesus/);
  });

  test('contains a main element with the page container width', () => {
    render(<Page>content</Page>);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('max-w-5xl');
  });

  test('page-in animation is motion-safe only', () => {
    render(<Page>content</Page>);
    const main = screen.getByRole('main');
    expect(main).toHaveClass('motion-safe:animate-page-in');
    expect(main).not.toHaveClass('animate-page-in');
  });

  test('footer is in flow after main, not inside it and not fixed', () => {
    render(<Page>content</Page>);
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');
    expect(main.querySelector('footer')).toBeNull();
    expect(main.nextElementSibling).toBe(footer);
    expect(footer).not.toHaveClass('fixed');
    expect(footer).not.toHaveClass('absolute');
    expect(footer).toHaveClass('print:hidden');
  });
});
