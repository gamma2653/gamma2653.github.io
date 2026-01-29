import { expect, test, describe } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Collage from '../../src/components/collage';

describe('Collage', () => {
  test('renders "No images to display." when given empty array', () => {
    render(<Collage imgs={[]} />);
    expect(screen.getByText('No images to display.')).toBeInTheDocument();
  });

  test('renders a single image', () => {
    render(<Collage imgs={['/img1.jpg']} />);
    expect(screen.getByAltText('Collage Image 1')).toBeInTheDocument();
  });

  test('renders two images in a 2-column grid', () => {
    const { container } = render(<Collage imgs={['/img1.jpg', '/img2.jpg']} />);
    expect(screen.getByAltText('Collage Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Collage Image 2')).toBeInTheDocument();
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('sm:grid-cols-2');
  });

  test('renders three or more images in a 3-column grid', () => {
    const { container } = render(
      <Collage imgs={['/img1.jpg', '/img2.jpg', '/img3.jpg']} />,
    );
    expect(screen.getAllByRole('img')).toHaveLength(3);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('md:grid-cols-3');
  });

  test('images have cursor-pointer class', () => {
    render(<Collage imgs={['/img1.jpg']} />);
    const img = screen.getByAltText('Collage Image 1');
    expect(img).toHaveClass('cursor-pointer');
  });

  test('clicking an image opens the modal', async () => {
    render(<Collage imgs={['/img1.jpg']} />);
    await userEvent.click(screen.getByAltText('Collage Image 1'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('modal shows the clicked image', async () => {
    render(<Collage imgs={['/img1.jpg', '/img2.jpg']} />);
    await userEvent.click(screen.getByAltText('Collage Image 2'));
    const dialog = screen.getByRole('dialog');
    const modalImg = dialog.querySelector('img');
    expect(modalImg).toHaveAttribute('src', '/img2.jpg');
  });

  test('closing the modal removes the dialog', async () => {
    render(<Collage imgs={['/img1.jpg']} />);
    await userEvent.click(screen.getByAltText('Collage Image 1'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText('Close modal'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
