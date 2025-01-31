import { ChineseWord, HSKLevel, Level, Word } from "@/types/word";
import JLPT_N1_WORDS from "@shared/data/japanese/jlpt_n1";
import JLPT_N2_WORDS from "@shared/data/japanese/jlpt_n2";
import JLPT_N3_WORDS from "@shared/data/japanese/jlpt_n3";
import JLPT_N4_WORDS from "@shared/data/japanese/jlpt_n4";
import JLPT_N5_WORDS from "@shared/data/japanese/jlpt_n5";

import HSK1_WORDS from "@shared/data/chinese/hsk1";
import HSK2_WORDS from "@shared/data/chinese/hsk2";
import HSK3_WORDS from "@shared/data/chinese/hsk3";
import HSK4_WORDS from "@shared/data/chinese/hsk4";
import HSK5_WORDS from "@shared/data/chinese/hsk5";
import HSK6_WORDS from "@shared/data/chinese/hsk6";

export const getHSKWords = (level: HSKLevel): ChineseWord[] => {
  const HSK_WORDS_MAP = {
    HSK1: HSK1_WORDS,
    HSK2: HSK2_WORDS,
    HSK3: HSK3_WORDS,
    HSK4: HSK4_WORDS,
    HSK5: HSK5_WORDS,
    HSK6: HSK6_WORDS,
  } as Record<HSKLevel, ChineseWord[]>;

  return HSK_WORDS_MAP[level] || [];
};

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
