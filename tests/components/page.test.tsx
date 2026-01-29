import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import Page from '../../src/components/page';

describe('Page', () => {
  test('renders children', () => {
    render(<Page><p>Page content</p></Page>);
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  test('renders footer with copyright', () => {
    render(<Page>content</Page>);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    expect(screen.getByText(/Christopher De Jesus/)).toBeInTheDocument();
  });

  test('has dark mode classes on outer div', () => {
    const { container } = render(<Page>content</Page>);
    const outer = container.firstElementChild as HTMLElement;
    expect(outer).toHaveClass('min-h-screen');
    expect(outer).toHaveClass('bg-gray-100');
  });

  test('contains a main element', () => {
    render(<Page>content</Page>);
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  test('footer is inside main', () => {
    render(<Page>content</Page>);
    const main = screen.getByRole('main');
    const footer = main.querySelector('footer');
    expect(footer).not.toBeNull();
  });
});
