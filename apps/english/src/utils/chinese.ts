import { ChineseWord, HSKLevel, EnglishLevel, EnglishWord } from "@/types/word";
import {
  HSK_1_WORDS,
  HSK_2_WORDS,
  HSK_3_WORDS,
  HSK_4_WORDS,
  HSK_5_WORDS,
  HSK_6_WORDS,
  TOEIC_WORDS,
  TOEFL_WORDS,
} from "data";

export const isValidHSKLevel = (level: string): level is HSKLevel => {
  return ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"].includes(level);
};

export const getHSKWords = (level: string): ChineseWord[] => {
  const HSK_WORDS_MAP = {
    HSK1: HSK_1_WORDS,
    HSK2: HSK_2_WORDS,
    HSK3: HSK_3_WORDS,
    HSK4: HSK_4_WORDS,
    HSK5: HSK_5_WORDS,
    HSK6: HSK_6_WORDS,
  } as Record<HSKLevel, ChineseWord[]>;

  if (!isValidHSKLevel(level)) {
    return [];
  }

  return HSK_WORDS_MAP[level];
};

export const isValidEnglishLevel = (level: string): level is EnglishLevel => {
  return ["TOEIC", "TOEFL"].includes(level);
};

export const getEnglishWords = (level: string): EnglishWord[] => {
  const HSK_WORDS_MAP = {
    TOEIC: TOEIC_WORDS,
    TOEFL: TOEFL_WORDS,
  } as Record<EnglishLevel, EnglishWord[]>;

  if (!isValidEnglishLevel(level)) {
    return [];
  }

  return HSK_WORDS_MAP[level];
};
