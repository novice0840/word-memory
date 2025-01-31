import { useLocalStorage } from "./useLocalStorage";

export const useGetMemoryList = (level: string) => {
  return useLocalStorage<{
    memoryList: number[];
    curIndex: number;
  }>(level, {
    memoryList: [],
    curIndex: 0,
  });
};
