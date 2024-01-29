import React, { useEffect, useState, MouseEvent } from "react";
import JLPTword from "../words/JLPTwords.json";
import { useParams } from "react-router-dom";
import { Container, Button, Typography, Stack } from "@mui/material";

type TotalWords = {
  [rate: string]: Word[];
};

type Word = {
  koreans: string[];
  original: string;
  pronunciation: string | null;
};

const WordSetPage = () => {
  const totalWords: TotalWords = JLPTword;
  const { rate = "N1" } = useParams();
  const { [rate]: words } = totalWords;
  const totalIndex = words.length;
  const [curIndex, setCurIndex] = useState<number>(0);
  const [koreanHidden, setKoreanHidden] = useState<boolean>(false);
  const [hiraganaHidden, setHiraganaHidden] = useState<boolean>(false);

  useEffect(() => {
    const memoryList = JSON.parse(localStorage.getItem(rate) as string);
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
      const memoryList = JSON.parse(localStorage.getItem(rate) as string);
      let nextIndex = curIndex + 1;
      while (memoryList.includes(nextIndex)) {
        nextIndex += 1;
      }
      memoryList?.push(curIndex);
      localStorage.setItem(rate, JSON.stringify(memoryList));
      setCurIndex(nextIndex);
    } else if (buttonId === "again") {
      const memoryList = JSON.parse(localStorage.getItem(rate) as string);
      let nextIndex = curIndex + 1;
      while (memoryList.includes(nextIndex)) {
        nextIndex += 1;
      }
      setCurIndex(nextIndex);
    }
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Typography>
          {curIndex}/{totalIndex}
        </Typography>
        <Typography>{words[curIndex].pronunciation}</Typography>
        <Typography> {hiraganaHidden ? "히라가나 숨김" : words[curIndex].original}</Typography>
        <Typography>{koreanHidden ? "한국어 숨김" : words[curIndex].koreans}</Typography>
        <Stack direction="row" spacing={2}>
          <Button id="korean" onClick={handleClick} variant="contained">
            한국어
          </Button>
          <Button id="hiragana" onClick={handleClick} variant="contained">
            히라가나
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button id="memorization" onClick={handleClick} variant="contained">
            암기완료
          </Button>
          <Button id="again" onClick={handleClick} variant="contained">
            다시외우기
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default WordSetPage;
