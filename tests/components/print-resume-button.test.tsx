import { expect, test, describe, rstest, afterEach } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import PrintResumeButton from '../../src/components/print-resume-button';

const originalPrint = window.print;

afterEach(() => {
  window.print = originalPrint;
});

describe('PrintResumeButton', () => {
  test('is a plain button that opens the print dialog', () => {
    const print = rstest.fn();
    window.print = print;

    render(<PrintResumeButton className="extra" />);
    const button = screen.getByRole('button', { name: 'Print / save resume as PDF' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('print:hidden', 'extra');

    fireEvent.click(button);
    expect(print).toHaveBeenCalledTimes(1);
  });
});
