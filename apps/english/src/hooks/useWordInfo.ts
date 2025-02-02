import { getWords } from "@/utils/word";
import { useGetMemoryList } from "shared/hooks";

export const useWordInfo = () => {
  const englishLength = {
    TOEIC: getWords("TOEIC").length,
    TOEFL: getWords("TOEFL").length,
  };

  const memoryListLength = {
    TOEIC: useGetMemoryList("TOEIC").memoryList.length,
    TOEFL: useGetMemoryList("TOEFL").memoryList.length,
  };
  return { englishLength, memoryListLength };
};
