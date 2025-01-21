import React from "react";
import { Button } from "./ui/button";

interface StudyActionProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StudyAction = ({ onClick }: StudyActionProps) => {
  return (
    <div className="h-32  w-full  max-w-md ">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 ">
        <Button id="showMeaning" onClick={onClick}>
          뜻 보기
        </Button>
        <Button id="showExampleSentences" onClick={onClick}>
          예문 해석 보기
        </Button>
        <Button id="memorization" onClick={onClick}>
          암기 완료
        </Button>
        <Button id="again" onClick={onClick}>
          다시 외우기
        </Button>
      </div>
    </div>
  );
};

export default StudyAction;
