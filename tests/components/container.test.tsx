import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import Container from '../../src/components/container';

describe('Container', () => {
  test('renders children', () => {
    render(<Container>Hello World</Container>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  test('applies "container" class by default', () => {
    const { container } = render(<Container>content</Container>);
    expect(container.firstElementChild).toHaveClass('container');
  });

  test('applies additional className', () => {
    const { container } = render(<Container className="extra">content</Container>);
    expect(container.firstElementChild).toHaveClass('container');
    expect(container.firstElementChild).toHaveClass('extra');
  });

  test('renders without additional className', () => {
    const { container } = render(<Container>content</Container>);
    const div = container.firstElementChild as HTMLElement;
    // Should only have the 'container' class
    expect(div.className).toBe('container');
  });
});
