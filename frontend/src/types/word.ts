import { LEVELS } from "@/constants/word";

type Level = (typeof LEVELS)[number];

type Word = {
  koreans: string[];
  pronunciation: string;
  kanji: string | null;
  level: Level;
  exampleSentences: {
    korean: string;
    japanese: string;
  }[];
};

export type { Word, Level };
