import { getWords } from "shared/utils";
import { useGetMemoryList } from "shared/hooks";

export const useWordInfo = () => {
  const languageLength = {
    N1: getWords("N1", "japanese").length,
    N2: getWords("N2", "japanese").length,
    N3: getWords("N3", "japanese").length,
    N4: getWords("N4", "japanese").length,
    N5: getWords("N5", "japanese").length,
  };

  const memoryListLength = {
    N1: useGetMemoryList("N1").memoryList.length,
    N2: useGetMemoryList("N2").memoryList.length,
    N3: useGetMemoryList("N3").memoryList.length,
    N4: useGetMemoryList("N4").memoryList.length,
    N5: useGetMemoryList("N5").memoryList.length,
  };
  return { languageLength, memoryListLength };
};
