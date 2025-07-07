import React from "react";
import { Button } from "shared/ui";
import { getWords } from "shared/utils";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetMemoryList } from "shared/hooks";

interface StudyActionProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StudyAction = ({ onClick }: StudyActionProps) => {
  const { level = "" } = useParams();
  const words = getWords(level, "japanese");
  const totalLength = words.length;
  const { memoryList } = useGetMemoryList(level);
  const [searchParams, setSearchParams] = useSearchParams();
  const isWordMeaningVisible =
    searchParams.get("isWordMeaningVisible") === "true";
  const isSentenceMeaningVisible =
    searchParams.get("isSentenceMeaningVisible") === "true";
  const isAllWordsMemorized = [...Array(totalLength).keys()].every((i) =>
    memoryList.includes(i)
  );

  const handleClickMeaning = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isWordMeaningVisible) {
      newParams.set("isWordMeaningVisible", "false");
    } else {
      newParams.set("isWordMeaningVisible", "true");
    }
    setSearchParams(newParams);
  };

  const handleClickSentence = () => {
    const newParams = new URLSearchParams(searchParams);
    if (isSentenceMeaningVisible) {
      newParams.set("isSentenceMeaningVisible", "false");
    } else {
      newParams.set("isSentenceMeaningVisible", "true");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="w-full h-32 grid grid-cols-2 grid-rows-2 gap-8">
      <Button id="meaning" onClick={handleClickMeaning} className="h-full">
        {isWordMeaningVisible ? "뜻 숨기기" : "뜻 보기"}
      </Button>
      <Button id="sentence" onClick={handleClickSentence} className="h-full">
        {isSentenceMeaningVisible ? "예문 해석 숨기기" : "예문 해석 보기"}
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
