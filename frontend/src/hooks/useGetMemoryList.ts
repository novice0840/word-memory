import { Level } from "@/types/word";
import { useLocalStorage } from "./useLocalStorage";

export const useGetMemoryList = (level: Level) => {
  return useLocalStorage<{
    memoryList: number[];
    curIndex: number;
  }>(level, {
    memoryList: [],
    curIndex: 0,
  });
};
