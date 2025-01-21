import { FatArrowLeft, FatArrowRight } from "@mynaui/icons-react";

interface StudyProgressProps {
  curIndex: number;
  memoryListLength: number;
  totalLength: number;
}

const StudyProgress = ({
  curIndex,
  memoryListLength,
  totalLength,
}: StudyProgressProps) => {
  return (
    <div className="flex justify-between items-center w-full  ">
      <FatArrowLeft />
      <div>
        <div>
          전체 단어 {curIndex}/{totalLength}
        </div>
        <div>
          외운 단어 {memoryListLength}/{totalLength}
        </div>
      </div>
      <FatArrowRight />
    </div>
  );
};

export default StudyProgress;
