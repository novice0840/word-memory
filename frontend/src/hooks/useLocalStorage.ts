import { useRef, useSyncExternalStore } from "react";

const useLocalStorage = <T>(key: string, defaultValue: T): T => {
  const snapshotRef = useRef<T>(defaultValue);

  const getSnapshot = (): T => {
    const storedValue = localStorage.getItem(key);
    const parsedValue =
      storedValue !== null ? JSON.parse(storedValue) : defaultValue;

    if (JSON.stringify(snapshotRef.current) !== JSON.stringify(parsedValue)) {
      snapshotRef.current = parsedValue;
    }

    return snapshotRef.current;
  };

  const subscribe = (callback: () => void): (() => void) => {
    const handler = (): void => {
      callback();
    };

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot);
};

const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event("storage"));
};

export { useLocalStorage, setLocalStorage };
