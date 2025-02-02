import { HSK_LEVELS, ENGLISH_LEVELS } from "@/constants/word";

type HSKLevel = (typeof HSK_LEVELS)[number];
type EnglishLevel = (typeof ENGLISH_LEVELS)[number];

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

type EnglishWord = {
  koreans: string[];
  pronunciation: string;
  original: string | null;
  level: EnglishLevel;
  sentences: {
    korean: string;
    original: string;
    pronunciation: string;
  }[];
};

export type { ChineseWord, HSKLevel, EnglishWord, EnglishLevel };
