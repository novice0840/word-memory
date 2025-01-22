import { useNavigate, useParams } from "react-router-dom";
import { MouseEvent } from "react";
import { getJLPTWords, getNextIndex } from "@/utils/word";
import { setLocalStorage, useLocalStorage } from "./useLocalStorage";
import { Level, Word } from "@/types/word";
import { useWord } from "./useWord";

const useStudyAction = () => {
  const navigate = useNavigate();
  const { level = "" } = useParams();
  const { memoryList, curIndex } = useLocalStorage<{
    memoryList: number[];
    curIndex: number;
  }>(level, {
    memoryList: [],
    curIndex: 0,
  });
  const words = getJLPTWords(level as Level) as Word[];
  const totalLength = words.length;

  const {
    showWordMeaning,
    showExampleSentencesMeaning,
    initWord,
    setShowWordMeaning,
    setShowExampleSentencesMeaning,
  } = useWord();

  const handleStudyActionClick = (event: MouseEvent<HTMLButtonElement>) => {
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
        setLocalStorage(level, {
          memoryList: memoryList.includes(curIndex)
            ? memoryList
            : [...memoryList, curIndex],
          curIndex: nextIndex,
        });

        if (memoryList.length == totalLength - 1) {
          navigate("/");
        }
        break;
      case "again":
        initWord();
        setLocalStorage(level, { memoryList, curIndex: nextIndex });
        break;
      default:
        throw new Error("Invalid button id");
    }
  };
  return {
    handleStudyActionClick,
    showWordMeaning,
    showExampleSentencesMeaning,
    initWord,
  };
};

export { useStudyAction };
