import { expect, test, describe, afterEach } from '@rstest/core';
import { act, render, screen } from '@testing-library/react';
import Reveal from '../../src/components/reveal';

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

const globals = globalThis as { IntersectionObserver?: unknown };
const originalObserver = globals.IntersectionObserver;

function stubIntersectionObserver() {
  const state = {
    callback: undefined as ObserverCallback | undefined,
    observed: [] as Element[],
    unobserved: [] as Element[],
  };
  class FakeIntersectionObserver {
    constructor(callback: ObserverCallback) {
      state.callback = callback;
    }
    observe(el: Element) {
      state.observed.push(el);
    }
    unobserve(el: Element) {
      state.unobserved.push(el);
    }
    disconnect() {}
  }
  globals.IntersectionObserver = FakeIntersectionObserver;
  return state;
}

describe('Reveal', () => {
  afterEach(() => {
    globals.IntersectionObserver = originalObserver;
  });

  test('shows children immediately without IntersectionObserver', () => {
    globals.IntersectionObserver = undefined;
    render(<Reveal>Hello</Reveal>);
    const el = screen.getByText('Hello');
    expect(el).toBeVisible();
    expect(el).toHaveAttribute('data-revealed', 'true');
    expect(el).toHaveClass('opacity-100', 'translate-y-0');
    expect(el).not.toHaveClass('motion-safe:opacity-0');
  });

  test('renders the requested element and merges className', () => {
    globals.IntersectionObserver = undefined;
    render(<Reveal as="section" className="custom">Hello</Reveal>);
    const el = screen.getByText('Hello');
    expect(el.tagName).toBe('SECTION');
    expect(el).toHaveClass('custom', 'motion-safe:transition');
  });

  test('applies delayMs as a transition delay', () => {
    globals.IntersectionObserver = undefined;
    render(<Reveal delayMs={150}>Hello</Reveal>);
    expect(screen.getByText('Hello')).toHaveStyle({ transitionDelay: '150ms' });
  });

  test('starts hidden (motion-safe only) and reveals once on intersection', () => {
    const observer = stubIntersectionObserver();
    render(<Reveal>Hello</Reveal>);
    const el = screen.getByText('Hello');

    expect(el).toHaveClass('motion-safe:opacity-0', 'motion-safe:translate-y-4');
    expect(el).not.toHaveClass('opacity-0');
    expect(el).toHaveAttribute('data-revealed', 'false');
    expect(observer.observed).toEqual([el]);

    act(() => observer.callback?.([{ isIntersecting: false }]));
    expect(el).toHaveAttribute('data-revealed', 'false');

    act(() => observer.callback?.([{ isIntersecting: true }]));
    expect(el).toHaveAttribute('data-revealed', 'true');
    expect(el).toHaveClass('opacity-100', 'translate-y-0');
    expect(el).not.toHaveClass('motion-safe:opacity-0');
    expect(observer.unobserved).toEqual([el]);
  });
});
