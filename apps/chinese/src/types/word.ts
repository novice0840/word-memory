import { HSK_LEVELS } from "@/constants/word";

type HSKLevel = (typeof HSK_LEVELS)[number];

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

export type { ChineseWord, HSKLevel };
