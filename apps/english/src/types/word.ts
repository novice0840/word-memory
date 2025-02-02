import { LEVELS } from "@/constants/word";

type Level = (typeof LEVELS)[number];

type Word = {
  koreans: string[];
  pronunciation: string;
  original: string;
  level: Level;
  sentences: {
    korean: string;
    original: string;
  }[];
};

export type { Word, Level };
