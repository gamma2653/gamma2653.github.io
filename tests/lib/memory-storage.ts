/**
 * Installs an in-memory `window.localStorage` for a test file.
 *
 * Newer Node versions define their own `localStorage` global, which is
 * undefined unless `--localstorage-file` is passed and shadows jsdom's, so
 * tests that exercise persistence bring their own Storage.
 */
export function installMemoryStorage(): Storage {
  const data = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => Array.from(data.keys())[index] ?? null,
    removeItem: (key) => {
      data.delete(key);
    },
    setItem: (key, value) => {
      data.set(key, String(value));
    },
  };
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: storage,
  });
  return storage;
}
