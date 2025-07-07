import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui";
import { LEVELS } from "@/constants/word";
import { useWordInfo } from "@/hooks/useWordInfo";
import { readSentence } from "shared/utils";
import { useGetMemoryList } from "shared/hooks";

const MainPage = () => {
  const { wordLength, memoryListLength } = useWordInfo();
  const navigate = useNavigate();
  const { curIndex: curN1Index } = useGetMemoryList("N1");
  const { curIndex: curN2Index } = useGetMemoryList("N2");
  const { curIndex: curN3Index } = useGetMemoryList("N3");
  const { curIndex: curN4Index } = useGetMemoryList("N4");
  const { curIndex: curN5Index } = useGetMemoryList("N5");

  const handleClick = (level: (typeof LEVELS)[number]) => {
    switch (level) {
      case "N1":
        navigate(`/words/${level}/${curN1Index}`);
        break;
      case "N2":
        navigate(`/words/${level}/${curN2Index}`);
        break;
      case "N3":
        navigate(`/words/${level}/${curN3Index}`);
        break;
      case "N4":
        navigate(`/words/${level}/${curN4Index}`);
        break;
      case "N5":
        navigate(`/words/${level}/${curN5Index}`);
        break;
    }

    // speech synthesis의 speak 기능은 첫 호출 시 1~2초 딜레이가 걸리므로
    // 미리 해당 기능을 초기화하여 cold start를 방지
    readSentence("", "japanese")
      .then(() => {
        console.log("Speech synthesis initialized");
      })
      .catch((err) => {
        console.warn("Speech synthesis initialization failed:", err);
      });
  };

  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <h1 className="text-4xl font-extrabold">일본어 단어 암기</h1>
      {LEVELS.map((level) => (
        <Card
          key={level}
          className="h-18 p-2 w-full"
          onClick={() => handleClick(level)}
        >
          <CardHeader className="p-0">
            <CardTitle className="text-lg">{level}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {`달성율 ${(
              (memoryListLength[level] / wordLength[level]) *
              100
            ).toFixed(2)}% ${memoryListLength[level]} / ${wordLength[level]}`}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MainPage;
