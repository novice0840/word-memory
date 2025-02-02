import { Level, Word } from "@/types/word";
import {
  JLPT_N1_WORDS,
  JLPT_N2_WORDS,
  JLPT_N3_WORDS,
  JLPT_N4_WORDS,
  JLPT_N5_WORDS,
} from "data";

export const isValidJLPTLevel = (level: string): level is Level => {
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

  if (!isValidJLPTLevel(level)) {
    return [];
  }

  return levelWords[level];
};
