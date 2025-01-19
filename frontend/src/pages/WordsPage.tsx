import { useEffect, useState, MouseEvent } from "react";
import JLPTword from "../words/JLPTwords.json";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

type TotalWords = {
  [rate: string]: Word[];
};

type Word = {
  koreans: string[];
  original: string;
  pronunciation: string | null;
};

const WordsPage = () => {
  const totalWords: TotalWords = JLPTword;
  const { rate = "N1" } = useParams();
  const { [rate]: words } = totalWords;
  const totalIndex = words.length;
  const [curIndex, setCurIndex] = useState<number>(0);
  const [koreanHidden, setKoreanHidden] = useState<boolean>(true);
  const [hiraganaHidden, setHiraganaHidden] = useState<boolean>(true);
  const memoryList = JSON.parse(localStorage.getItem(rate) as string);

  useEffect(() => {
    let nextIndex = curIndex;
    while (memoryList.includes(nextIndex)) {
      nextIndex += 1;
    }
    setCurIndex(nextIndex);
  }, []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget.id;
    if (buttonId === "korean") {
      setKoreanHidden(!koreanHidden);
    } else if (buttonId === "hiragana") {
      setHiraganaHidden(!hiraganaHidden);
    } else if (buttonId === "memorization") {
      if (memoryList.length == totalIndex - 1) {
        localStorage.setItem(rate, JSON.stringify([]));
        return 0;
      }
      let nextIndex = curIndex + 1;
      while (memoryList.includes(nextIndex)) {
        nextIndex += 1;
      }
      memoryList?.push(curIndex);
      localStorage.setItem(rate, JSON.stringify(memoryList));
      setCurIndex(nextIndex);
      setKoreanHidden(true);
      setHiraganaHidden(true);
    } else if (buttonId === "again") {
      let nextIndex = curIndex + 1;
      while (memoryList.includes(nextIndex)) {
        nextIndex += 1;
      }
      setKoreanHidden(true);
      setHiraganaHidden(true);
      setCurIndex(nextIndex);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center gap-9 text-xl ">
      <div>
        전체 단어 {curIndex}/{totalIndex}
      </div>
      <div>
        외운 단어 {memoryList.length}/{totalIndex}
      </div>
      <div className="text-6xl">
        {words[curIndex].pronunciation?.split("·").map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <div>{hiraganaHidden ? "히라가나 숨김" : words[curIndex].original}</div>
      <div>{koreanHidden ? "한국어 숨김" : words[curIndex].koreans}</div>
      <div className="flex gap-4">
        <Button id="korean" onClick={handleClick}>
          한국어
        </Button>
        <Button id="hiragana" onClick={handleClick}>
          히라가나
        </Button>
      </div>
      <div className="flex gap-4">
        <Button id="memorization" onClick={handleClick}>
          암기완료
        </Button>
        <Button id="again" onClick={handleClick}>
          다시외우기
        </Button>
      </div>
    </div>
  );
};

export default WordsPage;
