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
    <div>
      <div>
        전체 단어 {curIndex}/{totalLength}
      </div>
      <div>
        외운 단어 {memoryListLength}/{totalLength}
      </div>
    </div>
  );
};

export default StudyProgress;
