import { MouseEvent } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";

import {
  JLPT_N1_WORDS,
  JLPT_N2_WORDS,
  JLPT_N3_WORDS,
  JLPT_N4_WORDS,
  JLPT_N5_WORDS,
} from "@/words";
import { useLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";
import { LEVELS } from "@/constants/word";
import {
  StudyAction,
  StudyProgress,
  ExampleSentences,
  Word,
} from "@/components";
import { useWord } from "@/hooks/useWord";
import { getNextIndex } from "@/utils/word";

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
  const navigate = useNavigate();
  const { memoryList, curIndex } = useLocalStorage<{
    memoryList: number[];
    curIndex: number;
  }>(level, {
    memoryList: [],
    curIndex: 0,
  });
  const words = levelWords[level as Level] as Word[];
  const totalLength = words.length;

  if (!LEVELS.includes(level as Level) || memoryList.length === totalLength) {
    return <Navigate to="/" />;
  }

  const { kanji, pronunciation, koreans, exampleSentences } = words[curIndex];
  const {
    showWordMeaning,
    showExampleSentencesMeaning,
    initWord,
    setShowWordMeaning,
    setShowExampleSentencesMeaning,
  } = useWord();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    const nextIndex = getNextIndex(curIndex, memoryList, totalLength);

    switch (buttonId) {
      case "meaning":
        setShowWordMeaning(!showWordMeaning);
        break;
      case "sentence":
        setShowExampleSentencesMeaning(!showExampleSentencesMeaning);
        break;
      case "memorization":
        initWord();
        setLocalStorage(
          level,
          JSON.stringify({
            memoryList: memoryList.includes(curIndex)
              ? memoryList
              : [...memoryList, curIndex],
            curIndex: nextIndex,
          })
        );

        if (memoryList.length == totalLength - 1) {
          navigate("/");
        }
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

  const handleGoPrevWord = () => {
    const prevIndex = curIndex > 0 ? curIndex - 1 : totalLength - 1;
    initWord();
    setLocalStorage(level, JSON.stringify({ memoryList, curIndex: prevIndex }));
  };

  const handleGoNextWord = () => {
    const nextIndex = getNextIndex(curIndex, memoryList, totalLength);

    initWord();
    setLocalStorage(level, JSON.stringify({ memoryList, curIndex: nextIndex }));
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-between p-4">
      <section className="w-full">
        <StudyProgress
          curIndex={curIndex}
          memoryListLength={memoryList.length}
          totalLength={totalLength}
          onGoPrevWord={handleGoPrevWord}
          onGoNextWord={handleGoNextWord}
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
