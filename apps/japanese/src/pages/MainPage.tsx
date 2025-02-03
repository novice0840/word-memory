import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui";
import { LEVELS } from "@/constants/word";
import { useWordInfo } from "@/hooks/useWordInfo";

const MainPage = () => {
  const { wordLength, memoryListLength } = useWordInfo();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <h1 className="text-4xl font-extrabold">일본어 단어 암기</h1>
      {LEVELS.map((level) => (
        <Card
          key={level}
          className="h-18 p-2 w-full"
          onClick={() => navigate(`/words/${level}`)}
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
