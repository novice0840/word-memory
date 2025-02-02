import { getWords } from "shared/utils";
import { useGetMemoryList } from "shared/hooks";

export const useWordInfo = () => {
  const wordLength = {
    HSK1: getWords("HSK1", "chinese").length,
    HSK2: getWords("HSK2", "chinese").length,
    HSK3: getWords("HSK3", "chinese").length,
    HSK4: getWords("HSK4", "chinese").length,
    HSK5: getWords("HSK5", "chinese").length,
    HSK6: getWords("HSK6", "chinese").length,
  };

  const memoryListLength = {
    HSK1: useGetMemoryList("HSK1").memoryList.length,
    HSK2: useGetMemoryList("HSK2").memoryList.length,
    HSK3: useGetMemoryList("HSK3").memoryList.length,
    HSK4: useGetMemoryList("HSK4").memoryList.length,
    HSK5: useGetMemoryList("HSK5").memoryList.length,
    HSK6: useGetMemoryList("HSK6").memoryList.length,
  };
  return { wordLength, memoryListLength };
};
