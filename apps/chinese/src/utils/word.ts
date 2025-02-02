import { Word, Level } from "@/types/word";
import { LEVELS } from "@/constants/word";
import {
  HSK_1_WORDS,
  HSK_2_WORDS,
  HSK_3_WORDS,
  HSK_4_WORDS,
  HSK_5_WORDS,
  HSK_6_WORDS,
} from "data";

export const isValidLevel = (level: string): level is Level => {
  return LEVELS.some((l) => l === level);
};

export const getWords = (level: string): Word[] => {
  const HSK_WORDS_MAP = {
    HSK1: HSK_1_WORDS,
    HSK2: HSK_2_WORDS,
    HSK3: HSK_3_WORDS,
    HSK4: HSK_4_WORDS,
    HSK5: HSK_5_WORDS,
    HSK6: HSK_6_WORDS,
  } as Record<Level, Word[]>;

  if (!isValidLevel(level)) {
    return [];
  }

  return HSK_WORDS_MAP[level];
};
