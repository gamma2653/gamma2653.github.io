import { expect, test, describe } from '@rstest/core';
import { screen, waitFor } from '@testing-library/react';
import Banner from '../../src/components/banner';
import { renderWithRouter } from '../test-utils';

describe('Banner', () => {
  test('renders image with correct src', async () => {
    renderWithRouter(<Banner img="/banner.jpg" to="/" />);
    const img = await screen.findByAltText('Banner');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/banner.jpg');
  });

  test('renders caption when provided', async () => {
    renderWithRouter(<Banner img="/banner.jpg" to="/" caption="Click me" />);
    expect(await screen.findByText('Click me')).toBeInTheDocument();
  });

  test('does not render caption when not provided', async () => {
    renderWithRouter(<Banner img="/banner.jpg" to="/" />);
    // Wait for the banner image to confirm render is complete
    await screen.findByAltText('Banner');
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  test('renders text overlay instead of img when text_overlay is set', async () => {
    renderWithRouter(<Banner img="/banner.jpg" to="/" text_overlay="Software" />);
    expect(await screen.findByText('Software')).toBeInTheDocument();
    // In text_overlay mode, no <img> tag with alt="Banner" is rendered
    expect(screen.queryByAltText('Banner')).not.toBeInTheDocument();
  });

  test('uses background image style in text_overlay mode', async () => {
    const { container } = renderWithRouter(
      <Banner img="/banner.jpg" to="/" text_overlay="Robotics" />,
    );
    await screen.findByText('Robotics');
    const overlayDiv = container.querySelector('[style]') as HTMLElement;
    expect(overlayDiv.style.backgroundImage).toContain('/banner.jpg');
  });

  test('renders dark mode image when imgDark is provided', async () => {
    renderWithRouter(<Banner img="/light.jpg" imgDark="/dark.jpg" to="/" />);
    const darkImg = await screen.findByAltText('Banner Dark Mode');
    expect(darkImg).toBeInTheDocument();
    expect(darkImg).toHaveAttribute('src', '/dark.jpg');
  });

  test('applies custom classNames to wrapper div', async () => {
    renderWithRouter(
      <Banner img="/banner.jpg" to="/" classNames={{ div: 'mt-4' }} />,
    );
    await screen.findByAltText('Banner');
    await waitFor(() => {
      const wrapper = document.querySelector('.mt-4');
      expect(wrapper).toBeInTheDocument();
    });
  });
});
