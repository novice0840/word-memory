import { useNavigate, useParams } from "react-router-dom";
import { MouseEvent } from "react";
import { getJLPTWords, getNextUnmemorizedIndex } from "@/utils/word";
import { setLocalStorage } from "./useLocalStorage";
import { Level, Word } from "@/types/word";
import { useWord } from "./useWord";
import { useGetMemoryList } from "./useGetMemoryList";

const useStudyAction = () => {
  const navigate = useNavigate();
  const { level = "" } = useParams();
  const { memoryList, curIndex } = useGetMemoryList(level as Level);
  const words = getJLPTWords(level as Level) as Word[];
  const totalLength = words.length;

  const {
    showWordMeaning,
    showSentencesMeaning,
    setShowWordMeaning,
    setShowSentencesMeaning,
    initWord,
  } = useWord();

  const handleStudyActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    const nextIndex = getNextUnmemorizedIndex(
      curIndex,
      memoryList,
      totalLength
    );

    switch (buttonId) {
      case "meaning":
        setShowWordMeaning(!showWordMeaning);
        break;
      case "sentence":
        setShowSentencesMeaning(!showSentencesMeaning);
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
    showSentencesMeaning,
    initWord,
  };
};

export { useStudyAction };
