import React from "react";

// localStorage 스토어 생성
function createLocalStorageStore(key: string) {
  const getSnapshot = (): string => localStorage.getItem(key) || ""; // 최신 localStorage 값 반환

  const subscribe = (callback: () => void): (() => void) => {
    const handler = (event: StorageEvent): void => {
      console.log("Storage event detected:", event);
      callback(); // React 업데이트 트리거
    };

    // storage 이벤트 리스너 등록
    window.addEventListener("storage", handler);

    // 클린업 함수 반환
    return () => {
      window.removeEventListener("storage", handler);
    };
  };

  return { getSnapshot, subscribe };
}

// 커스텀 훅 정의
const useLocalStorage = (key: string): string => {
  const store = createLocalStorageStore(key);

  return React.useSyncExternalStore(store.subscribe, store.getSnapshot);
};

// localStorage 값을 설정하는 함수
const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);

  // 동일한 탭에서 storage 이벤트 트리거
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
