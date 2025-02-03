import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui";

import { LEVELS } from "@/constants/word";
import { getWords } from "shared/utils";
import { useGetMemoryList } from "shared/hooks";

const MainPage = () => {
  const JLPT_WORDS_LENGTH = {
    N1: getWords("N1", "japanese").length,
    N2: getWords("N2", "japanese").length,
    N3: getWords("N3", "japanese").length,
    N4: getWords("N4", "japanese").length,
    N5: getWords("N5", "japanese").length,
  };

  const memoryListLength = {
    N1: useGetMemoryList("N1").memoryList.length,
    N2: useGetMemoryList("N2").memoryList.length,
    N3: useGetMemoryList("N3").memoryList.length,
    N4: useGetMemoryList("N4").memoryList.length,
    N5: useGetMemoryList("N5").memoryList.length,
  };
  const navigate = useNavigate();

  const roundToDecimal = (num: number, decimalPlaces = 1) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  };

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
            {`달성율 ${roundToDecimal(
              memoryListLength[level] / JLPT_WORDS_LENGTH[level],
              3
            )}% ${memoryListLength[level]} / ${JLPT_WORDS_LENGTH[level]}`}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MainPage;
