import { ArrowRight, ArrowLeft } from "lucide-react";

interface StudyProgressProps {
  curIndex: number;
  memoryListLength: number;
  totalLength: number;
  onGoPrevWord: () => void;
  onGoNextWord: () => void;
}

const StudyProgress = ({
  curIndex,
  memoryListLength,
  totalLength,
  onGoPrevWord,
  onGoNextWord,
}: StudyProgressProps) => {
  return (
    <div className="flex justify-between items-center w-full  ">
      <button onClick={onGoPrevWord}>
        <ArrowLeft />
      </button>
      <div>
        <div>
          전체 단어 {curIndex}/{totalLength}
        </div>
        <div>
          외운 단어 {memoryListLength}/{totalLength}
        </div>
      </div>
      <button onClick={onGoNextWord}>
        <ArrowRight />
      </button>
    </div>
  );
};

export default StudyProgress;
