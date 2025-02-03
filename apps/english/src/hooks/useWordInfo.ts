import { getWords } from "shared/utils";
import { useGetMemoryList } from "shared/hooks";

export const useWordInfo = () => {
  const wordLength = {
    TOEIC: getWords("TOEIC", "english").length,
    TOEFL: getWords("TOEFL", "english").length,
  };

  const memoryListLength = {
    TOEIC: useGetMemoryList("TOEIC").memoryList.length,
    TOEFL: useGetMemoryList("TOEFL").memoryList.length,
  };
  return { wordLength, memoryListLength };
};
