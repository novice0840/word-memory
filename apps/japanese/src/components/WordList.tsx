import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, CircleCheckBig } from "lucide-react";

import { getWords, isValidLevel } from "shared/utils";
import { setLocalStorage, useGetMemoryList } from "shared/hooks";

interface WordListProps {
  isWordListOpen: boolean;
  onWordListClose: () => void;
}

const WordList = ({ isWordListOpen, onWordListClose }: WordListProps) => {
  const { level = "N1" } = useParams();
  const { memoryList, curIndex } = useGetMemoryList(level);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const words = getWords(level, "japanese");

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

  if (!isValidLevel(level, "japanese")) {
    return null;
  }

  return (
    <div
      aria-label="wordList"
      className={`font-japanese absolute top-0 left-0 h-full w-full transition-transform duration-300 p-4  ${
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
            {memoryList.includes(i) && <CircleCheckBig />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
