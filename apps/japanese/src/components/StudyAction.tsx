import React from "react";
import { Button } from "@shared/ui/button";

interface StudyActionProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StudyAction = ({ onClick }: StudyActionProps) => {
  return (
    <div className="w-full h-24 grid grid-cols-2 grid-rows-2 gap-4">
      <Button id="meaning" onClick={onClick} className="h-full">
        뜻 보기
      </Button>
      <Button id="sentence" onClick={onClick} className="h-full">
        예문 해석 보기
      </Button>
      <Button id="memorization" onClick={onClick} className="h-full">
        암기 완료
      </Button>
      <Button id="again" onClick={onClick} className="h-full">
        다시 외우기
      </Button>
    </div>
  );
};

export default StudyAction;
