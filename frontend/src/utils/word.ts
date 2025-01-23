import { Level, Word } from "@/types/word";
import {
  JLPT_N1_WORDS,
  JLPT_N2_WORDS,
  JLPT_N3_WORDS,
  JLPT_N4_WORDS,
  JLPT_N5_WORDS,
} from "@/words";

export const getNextIndex = (
  curIndex: number,
  memoryList: number[],
  totalLength: number
) => {
  // 다음 단어가 없을 경우 null을 반환
  if (memoryList.length === totalLength) return null;

  let nextIndex = (curIndex + 1) % totalLength;
  while (memoryList.includes(nextIndex)) {
    nextIndex = (nextIndex + 1) % totalLength;
  }
  return nextIndex;
};

export const getJLPTWords = (level: Level): Word[] => {
  const levelWords = {
    N1: JLPT_N1_WORDS,
    N2: JLPT_N2_WORDS,
    N3: JLPT_N3_WORDS,
    N4: JLPT_N4_WORDS,
    N5: JLPT_N5_WORDS,
  } as Record<Level, Word[]>;

  return levelWords[level] || [];
};
