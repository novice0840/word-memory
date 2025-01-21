import { FatArrowLeft, FatArrowRight } from "@mynaui/icons-react";

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
      <FatArrowLeft onClick={onGoPrevWord} />
      <div>
        <div>
          전체 단어 {curIndex}/{totalLength}
        </div>
        <div>
          외운 단어 {memoryListLength}/{totalLength}
        </div>
      </div>
      <FatArrowRight onClick={onGoNextWord} />
    </div>
  );
};

export default StudyProgress;
