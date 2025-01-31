import { Level, Word } from "@/types/word";
import JLPT_N1_WORDS from "@shared/data/japanese/jlpt_n1";
import JLPT_N2_WORDS from "@shared/data/japanese/jlpt_n2";
import JLPT_N3_WORDS from "@shared/data/japanese/jlpt_n3";
import JLPT_N4_WORDS from "@shared/data/japanese/jlpt_n4";
import JLPT_N5_WORDS from "@shared/data/japanese/jlpt_n5";

export const getNextIndex = (curIndex: number, totalLength: number) => {
  return (curIndex + 1) % totalLength;
};

export const getPrevIndex = (curIndex: number, totalLength: number) => {
  return curIndex > 0 ? curIndex - 1 : totalLength - 1;
};

export const getNextUnmemorizedIndex = (
  curIndex: number,
  memoryList: number[],
  totalLength: number
) => {
  if (memoryList.length === totalLength) {
    return null;
  }

  let nextIndex = (curIndex + 1) % totalLength;
  while (memoryList.includes(nextIndex)) {
    nextIndex = (nextIndex + 1) % totalLength;
  }
  return nextIndex;
};

export const isValidLevel = (level: string): level is Level => {
  return ["N1", "N2", "N3", "N4", "N5"].includes(level);
};

export const getJLPTWords = (level: string): Word[] => {
  const levelWords = {
    N1: JLPT_N1_WORDS,
    N2: JLPT_N2_WORDS,
    N3: JLPT_N3_WORDS,
    N4: JLPT_N4_WORDS,
    N5: JLPT_N5_WORDS,
  } as Record<Level, Word[]>;

  if (!isValidLevel(level)) {
    return [];
  }

  return levelWords[level];
};
