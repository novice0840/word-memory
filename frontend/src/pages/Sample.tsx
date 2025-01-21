import React from "react";

function createLocalStorageStore(key: string) {
  const getSnapshot = (): string => localStorage.getItem(key) || "";

  const subscribe = (callback: () => void): (() => void) => {
    const handler = (): void => {
      callback();
    };

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
    };
  };

  return { getSnapshot, subscribe };
}

const useLocalStorage = (key: string): string => {
  const store = createLocalStorageStore(key);

  return React.useSyncExternalStore(store.subscribe, store.getSnapshot);
};

const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event("storage"));
};

// React 컴포넌트
const App: React.FC = () => {
  const localStorageValue = useLocalStorage("myKey");

  const updateLocalStorage = (): void => {
    const newValue = prompt("Enter new value:", localStorageValue);
    if (newValue !== null) {
      setLocalStorage("myKey", newValue);
    }
  };

  return (
    <div>
      <h1>LocalStorage Value</h1>
      <p>{localStorageValue}</p>
      <button onClick={updateLocalStorage}>Update LocalStorage</button>
    </div>
  );
};

export default App;
