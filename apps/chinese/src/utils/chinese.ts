import { ChineseWord, HSKLevel } from "@/types/word";

import HSK1_WORDS from "@shared/data/chinese/hsk1";
import HSK2_WORDS from "@shared/data/chinese/hsk2";
import HSK3_WORDS from "@shared/data/chinese/hsk3";
import HSK4_WORDS from "@shared/data/chinese/hsk4";
import HSK5_WORDS from "@shared/data/chinese/hsk5";
import HSK6_WORDS from "@shared/data/chinese/hsk6";

export const isValidHSKLevel = (level: string): level is HSKLevel => {
  return ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"].includes(level);
};

export const getHSKWords = (level: string): ChineseWord[] => {
  const HSK_WORDS_MAP = {
    HSK1: HSK1_WORDS,
    HSK2: HSK2_WORDS,
    HSK3: HSK3_WORDS,
    HSK4: HSK4_WORDS,
    HSK5: HSK5_WORDS,
    HSK6: HSK6_WORDS,
  } as Record<HSKLevel, ChineseWord[]>;

  if (!isValidHSKLevel(level)) {
    return [];
  }

  return HSK_WORDS_MAP[level];
};
