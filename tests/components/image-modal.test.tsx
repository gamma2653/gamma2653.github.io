import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageModal from '../../src/components/image-modal';

describe('ImageModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: () => {},
    imageSrc: '/modal-image.jpg',
    imageAlt: 'Modal image',
  };

  test('renders image when open', () => {
    render(<ImageModal {...defaultProps} />);
    const img = screen.getByAltText('Modal image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/modal-image.jpg');
  });

  test('does not render image when closed', () => {
    render(<ImageModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByAltText('Modal image')).not.toBeInTheDocument();
  });

  test('renders close button with aria-label', () => {
    render(<ImageModal {...defaultProps} />);
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', async () => {
    let closed = false;
    render(<ImageModal {...defaultProps} onClose={() => { closed = true; }} />);
    await userEvent.click(screen.getByLabelText('Close modal'));
    expect(closed).toBe(true);
  });

  test('renders dialog element when open', () => {
    render(<ImageModal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('does not render dialog when closed', () => {
    render(<ImageModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
