import { getWords } from "shared/utils";
import { useGetMemoryList } from "shared/hooks";

export const useWordInfo = () => {
  const wordLength = {
    A1: getWords("A1", "french").length,
    A2: getWords("A2", "french").length,
    B1: getWords("B1", "french").length,
    B2: getWords("B2", "french").length,
    C1: getWords("C1", "french").length,
    C2: getWords("C2", "french").length,
  };

  const memoryListLength = {
    A1: useGetMemoryList("A1").memoryList.length,
    A2: useGetMemoryList("A2").memoryList.length,
    B1: useGetMemoryList("B1").memoryList.length,
    B2: useGetMemoryList("B2").memoryList.length,
    C1: useGetMemoryList("C1").memoryList.length,
    C2: useGetMemoryList("C2").memoryList.length,
  };
  return { wordLength, memoryListLength };
};
