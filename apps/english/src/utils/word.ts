import { Level, Word } from "@/types/word";
import { TOEIC_WORDS, TOEFL_WORDS } from "data";

export const isValidLevel = (level: string): level is Level => {
  return ["TOEIC", "TOEFL"].includes(level);
};

export const getWords = (level: string): Word[] => {
  const WORDS_MAP = {
    TOEIC: TOEIC_WORDS,
    TOEFL: TOEFL_WORDS,
  } as Record<Level, Word[]>;

  if (!isValidLevel(level)) {
    return [];
  }

  return WORDS_MAP[level];
};
