import { getEnglishWords } from "@/utils/chinese";
import { useGetMemoryList } from "shared/hooks";

export const useWordInfo = () => {
  const englishLength = {
    TOEIC: getEnglishWords("TOEIC").length,
    TOEFL: getEnglishWords("TOEFL").length,
  };

  const memoryListLength = {
    TOEIC: useGetMemoryList("TOEIC").memoryList.length,
    TOEFL: useGetMemoryList("TOEFL").memoryList.length,
  };
  return { englishLength, memoryListLength };
};
