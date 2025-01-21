import { useState, MouseEvent } from "react";
import { Navigate, useParams } from "react-router-dom";

import JLPT_N1_WORDS from "@/words/JLPT_N1_WORDS.json";
import JLPT_N2_WORDS from "@/words/JLPT_N2_WORDS.json";
import JLPT_N3_WORDS from "@/words/JLPT_N3_WORDS.json";
import JLPT_N4_WORDS from "@/words/JLPT_N4_WORDS.json";
import JLPT_N5_WORDS from "@/words/JLPT_N5_WORDS.json";
import { useLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";
import { LEVELS } from "@/constants/word";
import StudyAction from "@/components/StudyAction";
import StudyProgress from "@/components/StudyProgress";
import ExampleSentences from "@/components/ExampleSentences";
import Word from "@/components/Word";

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

const levelWords = {
  N1: JLPT_N1_WORDS,
  N2: JLPT_N2_WORDS,
  N3: JLPT_N3_WORDS,
  N4: JLPT_N4_WORDS,
  N5: JLPT_N5_WORDS,
};

const WordsPage = () => {
  const { level = "" } = useParams();

  if (!["N1", "N2", "N3", "N4", "N5"].includes(level)) {
    return <Navigate to="/" />;
  }

  const words = levelWords[level as Level] as Word[];
  const totalLength = words.length;
  const { memoryList, curIndex } = useLocalStorage<{
    memoryList: number[];
    curIndex: number;
  }>(level, {
    memoryList: [],
    curIndex: 0,
  });

  const { kanji, pronunciation, koreans, exampleSentences } = words[curIndex];
  const [showWordMeaning, setShowWordMeaning] = useState(false);
  const [showExampleSentencesMeaning, setShowExampleSentencesMeaning] =
    useState(false);

  const initWord = () => {
    setShowWordMeaning(false);
    setShowExampleSentencesMeaning(false);
  };

  const getNextIndex = (curIndex: number, memoryList: number[]) => {
    let nextIndex = curIndex + 1;
    while (memoryList.includes(nextIndex)) {
      nextIndex += 1;
    }
    return nextIndex;
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    const nextIndex = getNextIndex(curIndex, memoryList);

    switch (buttonId) {
      case "meaning":
        setShowWordMeaning(!showWordMeaning);
        break;
      case "sentence":
        setShowExampleSentencesMeaning(!showExampleSentencesMeaning);
        break;
      case "memorization":
        if (memoryList.length == totalLength - 1) {
          return 0;
        }

        initWord();
        setLocalStorage(
          level,
          JSON.stringify({
            memoryList: [...memoryList, curIndex],
            curIndex: nextIndex,
          })
        );
        break;
      case "again":
        initWord();
        setLocalStorage(
          level,
          JSON.stringify({ memoryList, curIndex: nextIndex })
        );
        break;
      default:
        throw new Error("Invalid button id");
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-between p-4">
      <section className="w-full">
        <StudyProgress
          curIndex={curIndex}
          memoryListLength={memoryList.length}
          totalLength={totalLength}
        />
        <section className="w-full max-h-96 overflow-auto">
          <Word
            kanji={kanji}
            pronunciation={pronunciation}
            koreans={koreans}
            showMeaning={showWordMeaning}
          />
          <ExampleSentences
            sentences={exampleSentences}
            showMeaning={showExampleSentencesMeaning}
          />
        </section>
      </section>

      <StudyAction onClick={handleClick} />
    </main>
  );
};

export default WordsPage;
