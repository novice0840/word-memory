import { HSK_LEVELS, LEVELS } from "@/constants/word";

type HSKLevel = (typeof HSK_LEVELS)[number];
type Level = (typeof LEVELS)[number];

type Word = {
  koreans: string[];
  pronunciation: string;
  original: string | null;
  level: Level;
  sentences: {
    korean: string;
    original: string;
  }[];
};

type ChineseWord = {
  koreans: string[];
  pronunciation: string;
  original: string | null;
  level: HSKLevel;
  sentences: {
    korean: string;
    original: string;
    pronunciation: string;
  }[];
};

export type { ChineseWord, HSKLevel, Word, Level };
