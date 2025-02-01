import { useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "@mynaui/icons-react";
import { Level } from "@/types/word";
import { getJLPTWords, isValidJLPTLevel } from "@/utils/japanese";
import { setLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useRef } from "react";
import { useGetMemoryList } from "@/hooks/useGetMemoryList";

interface WordListProps {
  isWordListOpen: boolean;
  onWordListClose: () => void;
}

const WordList = ({ isWordListOpen, onWordListClose }: WordListProps) => {
  const { level = "N1" } = useParams();
  const { memoryList, curIndex } = useGetMemoryList(level as Level);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const words = getJLPTWords(level as Level);

  const handleWordClick = (wordIndex: number) => {
    setLocalStorage(level, {
      memoryList,
      curIndex: wordIndex,
    });
    onWordListClose();
  };

  useEffect(() => {
    if (isWordListOpen && curIndex >= 0 && itemRefs.current[curIndex]) {
      itemRefs.current[curIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isWordListOpen, curIndex]);

  if (!isValidJLPTLevel(level)) {
    return null;
  }

  return (
    <div
      aria-label="wordList"
      className={`absolute top-0 left-0 h-full w-full transition-transform duration-300 p-4  ${
        isWordListOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <button aria-label="arrowLeftIcon" onClick={onWordListClose}>
          <ArrowLeft />
        </button>
        <h2 className="text-3xl font-bold">{level}</h2>
      </div>
      <ul className="space-y-2 h-5/6 overflow-scroll">
        {words.map((word, i) => (
          <li
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => handleWordClick(i)}
            className="flex justify-between border rounded text-xl"
          >
            <span>{word.original || word.pronunciation}</span>
            {memoryList.includes(i) && <CheckCircle />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
