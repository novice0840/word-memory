import { MouseEvent } from "react";
import { Button } from "shared/ui";
import { getWords } from "shared/utils";
import { useParams } from "react-router-dom";
import { useGetMemoryList } from "shared/hooks";

interface StudyActionProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const StudyAction = ({ onClick }: StudyActionProps) => {
  const { level = "" } = useParams();
  const words = getWords(level, "english");
  const totalLength = words.length;
  const { memoryList } = useGetMemoryList(level);

  const isAllWordsMemorized = [...Array(totalLength).keys()].every((i) =>
    memoryList.includes(i)
  );

  return (
    <div className="w-full h-24 grid grid-cols-2 grid-rows-2 gap-4">
      <Button id="meaning" onClick={onClick} className="h-full">
        뜻 보기
      </Button>
      <Button id="sentence" onClick={onClick} className="h-full">
        예문 해석 보기
      </Button>
      <Button
        disabled={isAllWordsMemorized}
        id="memorization"
        onClick={onClick}
        className="h-full"
      >
        암기 완료
      </Button>
      <Button
        disabled={isAllWordsMemorized}
        id="again"
        onClick={onClick}
        className="h-full"
      >
        다시 외우기
      </Button>
    </div>
  );
};

export default StudyAction;
