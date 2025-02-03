import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui";
import { roundToDecimal } from "shared/utils";
import { useWordInfo } from "@/hooks/useWordInfo";
import { LEVELS } from "@/constants/word";

const MainPage = () => {
  const { languageLength, memoryListLength } = useWordInfo();
  const navigate = useNavigate();

  return (
    <div className="pt-4">
      <h1 className="text-center text-4xl font-extrabold mb-4">
        프랑스어 단어 암기
      </h1>
      <div className="space-y-4 h-[32rem] overflow-auto">
        {LEVELS.map((level) => (
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
                memoryListLength[level] / languageLength[level]
              )}% ${memoryListLength[level]} / ${languageLength[level]}`}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
