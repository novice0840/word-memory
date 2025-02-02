import { Level, Word } from "@/types/word";
import {
  JLPT_N1_WORDS,
  JLPT_N2_WORDS,
  JLPT_N3_WORDS,
  JLPT_N4_WORDS,
  JLPT_N5_WORDS,
} from "data";
import { LEVELS } from "@/constants/word";

export const isValidLevel = (level: string): level is Level => {
  return LEVELS.some((l) => l === level);
};

export const getWords = (level: string): Word[] => {
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
