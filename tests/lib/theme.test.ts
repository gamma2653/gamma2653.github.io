import { afterEach, beforeEach, describe, expect, test } from '@rstest/core';
import { installMemoryStorage } from './memory-storage';
import {
  THEME_STORAGE_KEY,
  applyTheme,
  getStoredTheme,
  resolveTheme,
  setTheme,
} from '../../src/lib/theme';

const originalMatchMedia = window.matchMedia;

function stubMatchMedia(prefersDark: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: prefersDark && query.includes('dark'),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  installMemoryStorage();
});

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  window.localStorage.removeItem(THEME_STORAGE_KEY);
  document.documentElement.classList.remove('dark');
  document.documentElement.style.colorScheme = '';
});

describe('theme', () => {
  test('follows a dark OS when nothing is stored', () => {
    stubMatchMedia(true);
    expect(resolveTheme()).toBe('dark');
  });

  test('follows a light OS when nothing is stored', () => {
    stubMatchMedia(false);
    expect(resolveTheme()).toBe('light');
  });

  test('falls back to light without matchMedia', () => {
    // @ts-expect-error - simulating an environment without matchMedia (jsdom)
    window.matchMedia = undefined;
    expect(resolveTheme()).toBe('light');
  });

  test('setTheme applies the dark class and persists the choice', () => {
    setTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    setTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });

  test('a stored light choice beats a dark OS', () => {
    stubMatchMedia(true);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light');
    expect(resolveTheme()).toBe('light');
  });

  test('ignores unrecognised stored values', () => {
    stubMatchMedia(true);
    window.localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    expect(getStoredTheme()).toBeNull();
    expect(resolveTheme()).toBe('dark');
  });

  test('applyTheme does not persist', () => {
    applyTheme('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });
});
