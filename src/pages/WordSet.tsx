import React, { useCallback, useState } from "react";
import JLPTword from "../words/JLPTwords.json";
import { useParams } from "react-router-dom";
import { Container, Button, Typography } from "@mui/material";

type TotalWords = {
  [rate: string]: Word[];
};

type Word = {
  koreans: string[];
  original: string;
  pronunciation: string | null;
};

const WordSetPage = () => {
  const { rate = "N1" } = useParams();
  const totalWords: TotalWords = JLPTword;
  const { [rate]: words } = totalWords;
  const [curIndex, setCurIndex] = useState<number>(0);
  const [totalIndex, setTotalIndex] = useState<number>(words.length);

  const handleClick = useCallback(() => {
    setCurIndex((value) => value + 1);
  }, []);

  return (
    <Container>
      <Typography>
        {curIndex}/{totalIndex}
      </Typography>
      <Typography> {words[curIndex].koreans}</Typography>
      <Typography>{words[curIndex].original}</Typography>
      <Typography>{words[curIndex].pronunciation}</Typography>

      <Button onClick={handleClick}>암기완료</Button>
      <Button onClick={handleClick}>다시외우기</Button>
    </Container>
  );
};

export default WordSetPage;
