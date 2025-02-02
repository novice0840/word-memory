import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui";
import { roundToDecimal } from "shared/utils";
import { HSK_LEVELS } from "@/constants/word";
import { useWordInfo } from "@/hooks/useWordInfo";

const MainPage = () => {
  const { hskLength, memoryListLength } = useWordInfo();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <h1 className="text-4xl font-extrabold">중국어 단어 암기</h1>
      {HSK_LEVELS.map((level) => (
        <Card
          key={level}
          className="p-1 w-full"
          onClick={() => navigate(`/words/${level}`)}
        >
          <CardHeader className="p-0">
            <CardTitle className="text-lg">{level}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {`달성율 ${roundToDecimal(
              memoryListLength[level] / hskLength[level],
              3
            )}% ${memoryListLength[level]} / ${hskLength[level]}`}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MainPage;
