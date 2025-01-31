import { getHSKWords } from "@/utils/chinese";
import { useGetMemoryList } from "./useGetMemoryList";

export const useWordInfo = () => {
  const hskLength = {
    HSK1: getHSKWords("HSK1").length,
    HSK2: getHSKWords("HSK2").length,
    HSK3: getHSKWords("HSK3").length,
    HSK4: getHSKWords("HSK4").length,
    HSK5: getHSKWords("HSK5").length,
    HSK6: getHSKWords("HSK6").length,
  };

  const memoryListLength = {
    HSK1: useGetMemoryList("HSK1").memoryList.length,
    HSK2: useGetMemoryList("HSK2").memoryList.length,
    HSK3: useGetMemoryList("HSK3").memoryList.length,
    HSK4: useGetMemoryList("HSK4").memoryList.length,
    HSK5: useGetMemoryList("HSK5").memoryList.length,
    HSK6: useGetMemoryList("HSK6").memoryList.length,
  };
  return { hskLength, memoryListLength };
};
