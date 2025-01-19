import React from "react";
import { Button } from "./ui/button";

interface StudyActionProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StudyAction = ({ onClick }: StudyActionProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full p-4 grid grid-cols-2 grid-rows-2 gap-4 ">
      <Button id="showMeaning" onClick={onClick}>
        뜻 보기
      </Button>
      <Button id="showExampleSentences" onClick={onClick}>
        예문 보기
      </Button>
      <Button id="memorization" onClick={onClick}>
        암기 완료
      </Button>
      <Button id="again" onClick={onClick}>
        다시 외우기
      </Button>
    </div>
  );
};

export default StudyAction;
