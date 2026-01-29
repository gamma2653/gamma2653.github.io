import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { CaptionedImage } from '../../src/components/image';

describe('CaptionedImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    caption: 'Test caption',
  };

  test('renders image with correct src and alt', () => {
    render(<CaptionedImage {...defaultProps} />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });

  test('renders caption text', () => {
    render(<CaptionedImage {...defaultProps} />);
    expect(screen.getByText('Test caption')).toBeInTheDocument();
  });

  test('applies default image classes', () => {
    render(<CaptionedImage {...defaultProps} />);
    const img = screen.getByAltText('Test image');
    expect(img).toHaveClass('rounded-lg', 'shadow-md');
  });

  test('applies custom classNames to div', () => {
    render(<CaptionedImage {...defaultProps} classNames={{ div: 'custom-div' }} />);
    const caption = screen.getByText('Test caption');
    expect(caption.parentElement).toHaveClass('custom-div');
  });

  test('applies custom classNames to img and caption', () => {
    render(
      <CaptionedImage
        {...defaultProps}
        classNames={{ div_img: 'img-class', div_p: 'p-class' }}
      />,
    );
    const img = screen.getByAltText('Test image');
    expect(img).toHaveClass('img-class');
    const caption = screen.getByText('Test caption');
    expect(caption).toHaveClass('p-class');
  });
});
