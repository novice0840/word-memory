import { useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "@mynaui/icons-react";
import { LEVELS } from "@/constants/word";
import { Level } from "@/types/word";
import { getJLPTWords } from "@/utils/word";
import { useLocalStorage, setLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useRef } from "react";

interface WordListProps {
  isWordListOpen: boolean;
  onWordListClose: () => void;
}

const isLevel = (value: string): value is Level => {
  return LEVELS.includes(value as Level);
};

const WordList = ({ isWordListOpen, onWordListClose }: WordListProps) => {
  const { level = "" } = useParams();

  if (!isLevel(level)) {
    return null;
  }

  const words = getJLPTWords(level);
  const { memoryList, curIndex } = useLocalStorage<{
    memoryList: number[];
    curIndex: number;
  }>(level, {
    memoryList: [],
    curIndex: 0,
  });

  const handleWordClick = (wordIndex: number) => {
    setLocalStorage(level, {
      memoryList,
      curIndex: wordIndex,
    });
    onWordListClose();
  };

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (isWordListOpen && curIndex >= 0 && itemRefs.current[curIndex]) {
      itemRefs.current[curIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isWordListOpen, curIndex]);

  return (
    <div
      className={`absolute top-0 left-0 h-full w-full transition-transform duration-300 p-4  ${
        isWordListOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <ArrowLeft onClick={onWordListClose} />
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
            <span>{word.kanji || word.pronunciation}</span>
            {memoryList.includes(i) && <CheckCircle />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;
