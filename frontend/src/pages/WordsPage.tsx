import { useEffect, useState, MouseEvent } from "react";
import { Navigate, useParams } from "react-router-dom";

import JLPT_N1_WORDS from "@/words/JLPT_N1_WORDS.json";
import JLPT_N2_WORDS from "@/words/JLPT_N2_WORDS.json";
import JLPT_N3_WORDS from "@/words/JLPT_N3_WORDS.json";
import JLPT_N4_WORDS from "@/words/JLPT_N4_WORDS.json";
import JLPT_N5_WORDS from "@/words/JLPT_N5_WORDS.json";
import StudyProgress from "@/components/StudyProgress";
import StudyAction from "@/components/StudyAction";

type Level = "N1" | "N2" | "N3" | "N4" | "N5";

type Word = {
  koreans: string[];
  original: string;
  pronunciation: string;
  kanji: string | null;
  level: Level;
  exampleSentences: {
    korean: string;
    japanese: string;
  }[];
};

const getWords = (level: Level) => {
  const levelWords = {
    N1: JLPT_N1_WORDS,
    N2: JLPT_N2_WORDS,
    N3: JLPT_N3_WORDS,
    N4: JLPT_N4_WORDS,
    N5: JLPT_N5_WORDS,
  };
  return levelWords[level];
};

const WordsPage = () => {
  const { level = "N1" } = useParams();

  if (!["N1", "N2", "N3", "N4", "N5"].includes(level || "")) {
    return <Navigate to="/" />;
  }

  const words = getWords(level as Level) as Word[];
  const totalLength = words.length;
  const memoryList = JSON.parse(
    (localStorage.getItem(level) as string) || "[]"
  );

  const [curIndex, setCurIndex] = useState<number>(0);
  const [koreanHidden, setKoreanHidden] = useState<boolean>(true);
  const [hiraganaHidden, setHiraganaHidden] = useState<boolean>(true);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    if (buttonId === "showMeaning") {
      setKoreanHidden(!koreanHidden);
      setHiraganaHidden(!hiraganaHidden);
    } else if (buttonId === "memorization") {
      if (memoryList.length == totalLength - 1) {
        localStorage.setItem(level, JSON.stringify([]));
        return 0;
      }
      let nextIndex = curIndex + 1;
      while (memoryList.includes(nextIndex)) {
        nextIndex += 1;
      }
      memoryList?.push(curIndex);
      localStorage.setItem(level, JSON.stringify(memoryList));
      setCurIndex(nextIndex);
      setKoreanHidden(true);
      setHiraganaHidden(true);
    } else if (buttonId === "again") {
      let nextIndex = curIndex + 1;
      while (memoryList.includes(nextIndex)) {
        nextIndex += 1;
      }
      setKoreanHidden(true);
      setHiraganaHidden(true);
      setCurIndex(nextIndex);
    }
  };

  useEffect(() => {
    let nextIndex = curIndex;
    while (memoryList.includes(nextIndex)) {
      nextIndex += 1;
    }
    setCurIndex(nextIndex);
  }, []);

  return (
    <div className="flex flex-col justify-between items-center gap-4 text-xl">
      <StudyProgress
        curIndex={curIndex}
        memoryListLength={memoryList.length}
        totalLength={totalLength}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl">
          {words[curIndex].kanji?.split("·").map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <div>
          {hiraganaHidden ? "히라가나 숨김" : words[curIndex].pronunciation}
        </div>
        <div>
          {koreanHidden
            ? "한국어 숨김"
            : words[curIndex].koreans?.map((item) => (
                <div className="text-center" key={item}>
                  {item}
                </div>
              ))}
        </div>
        <div className="h-64 overflow-auto">
          {words[curIndex].exampleSentences.map((item, index) => (
            <div key={index}>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.japanese,
                }}
              />
              <div>{item.korean}</div>
            </div>
          ))}
        </div>
      </div>
      <StudyAction onClick={handleClick} />
    </div>
  );
};

export default WordsPage;
