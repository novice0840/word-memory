import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

import { HSK_LEVELS } from "@/constants/word";
import { getHSKWords } from "@/utils/word";
import { useGetMemoryList } from "@/hooks/useGetMemoryList";

const MainPage = () => {
  const hskLength = {
    HSK1: getHSKWords("HSK1").length,
    HSK2: getHSKWords("HSK2").length,
    HSK3: getHSKWords("HSK3").length,
    HSK4: getHSKWords("HSK4").length,
    HSK5: getHSKWords("HSK5").length,
    HSK6: getHSKWords("HSK6").length,
  };

  // const JLPT_WORDS_LENGTH = {
  //   N1: getJLPTWords("N1").length,
  //   N2: getJLPTWords("N2").length,
  //   N3: getJLPTWords("N3").length,
  //   N4: getJLPTWords("N4").length,
  //   N5: getJLPTWords("N5").length,
  // };

  const memoryListLength = {
    HSK1: useGetMemoryList("HSK1").memoryList.length,
    HSK2: useGetMemoryList("HSK2").memoryList.length,
    HSK3: useGetMemoryList("HSK3").memoryList.length,
    HSK4: useGetMemoryList("HSK4").memoryList.length,
    HSK5: useGetMemoryList("HSK5").memoryList.length,
    HSK6: useGetMemoryList("HSK6").memoryList.length,
  };
  const navigate = useNavigate();

  const roundToDecimal = (num: number, decimalPlaces = 1) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  };

  return (
    <div className="flex flex-col items-center gap-6 pt-4">
      <h1 className="text-4xl font-extrabold">중국어 단어 암기</h1>
      {HSK_LEVELS.map((level) => (
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
