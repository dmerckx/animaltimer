"use client";

import { useCallback, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function notify(key: string) {
  listeners.get(key)?.forEach((listener) => listener());
}

export function useSessionStorageValue(key: string) {
  const subscribe = useCallback(
    (listener: () => void) => {
      const keyListeners = listeners.get(key) ?? new Set<() => void>();
      keyListeners.add(listener);
      listeners.set(key, keyListeners);

      const handleStorage = (event: StorageEvent) => {
        if (event.storageArea === sessionStorage && event.key === key) {
          listener();
        }
      };
      window.addEventListener("storage", handleStorage);

      return () => {
        keyListeners.delete(listener);
        if (keyListeners.size === 0) listeners.delete(key);
        window.removeEventListener("storage", handleStorage);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => sessionStorage.getItem(key), [key]);
  const getServerSnapshot = useCallback(() => null, []);
  const value = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setValue = useCallback(
    (nextValue: string | null) => {
      if (nextValue === null) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, nextValue);
      }
      notify(key);
    },
    [key],
  );

  return [value, setValue] as const;
}
