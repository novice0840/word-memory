import { useEffect, useState, MouseEvent } from "react";
import JLPTword from "../words/JLPTwords.json";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Typography, Stack } from "@mui/material";
import CompleteDialog from "../components/CompleteDialog";

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
  const [koreanHidden, setKoreanHidden] = useState<boolean>(true);
  const [hiraganaHidden, setHiraganaHidden] = useState<boolean>(true);
  const navigate = useNavigate();
  const memoryList = JSON.parse(localStorage.getItem(rate) as string);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
        handleDialogOpen();
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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    navigate("/");
    setDialogOpen(false);
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <CompleteDialog handleDialogClose={handleDialogClose} dialogOpen={dialogOpen} />
      <Stack
        sx={{ height: "100vh" }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button variant="contained" onClick={() => navigate("/")}>
          메인 메뉴
        </Button>
        <Typography>
          전체 단어 {curIndex}/{totalIndex}
        </Typography>
        <Typography>
          외운 단어 {memoryList.length}/{totalIndex}
        </Typography>
        <Typography variant="h3">{words[curIndex].pronunciation}</Typography>
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
