import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

const DARK_QUERY = '(prefers-color-scheme: dark)';

const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((listener) => listener());
}

/** The theme the user explicitly chose, or null when they never toggled. */
export function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

/** The OS preference. Falls back to light where matchMedia is unavailable (jsdom). */
export function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/** Stored choice wins; otherwise follow the OS. */
export function resolveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

/** Reflect the theme on <html>: the `dark` class drives every `dark:` utility. */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

/** Persist an explicit choice, apply it and tell subscribers. */
export function setTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode, blocked): the choice lasts for this page only.
  }
  applyTheme(theme);
  notify();
}

// The class on <html> is the single source of truth for what is on screen.
function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getServerSnapshot(): Theme {
  return 'light';
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function syncFromEnvironment(): void {
  applyTheme(resolveTheme());
  notify();
}

export function useTheme(): {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
} {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = useCallback(() => {
    setTheme(getSnapshot() === 'dark' ? 'light' : 'dark');
  }, []);
  return { theme, toggle, setTheme };
}

// Apply at module load so the class is on <html> before React's first render.
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  applyTheme(resolveTheme());

  // With nothing stored, keep following the OS as it changes.
  if (typeof window.matchMedia === 'function') {
    window.matchMedia(DARK_QUERY).addEventListener?.('change', () => {
      if (getStoredTheme() === null) syncFromEnvironment();
    });
  }

  // A choice made in another tab applies here too.
  window.addEventListener('storage', (event) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) syncFromEnvironment();
  });
}
