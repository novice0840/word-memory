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
      <ArrowLeft onClick={onGoPrevWord} />
      <div>
        <div>
          전체 단어 {curIndex + 1}/{totalLength}
        </div>
        <div>
          외운 단어 {memoryListLength}/{totalLength}
        </div>
      </div>
      <ArrowRight onClick={onGoNextWord} />
    </div>
  );
};

export default StudyProgress;
