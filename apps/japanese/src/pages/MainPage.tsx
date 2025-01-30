import { useNavigate } from "react-router-dom";
import { Button } from "@shared/ui/button";
import { LEVELS } from "@/constants/word";
import { getJLPTWords } from "@/utils/word";
import { useGetMemoryList } from "@/hooks/useGetMemoryList";

const MainPage = () => {
  const JLPT_WORDS_LENGTH = {
    N1: getJLPTWords("N1").length,
    N2: getJLPTWords("N2").length,
    N3: getJLPTWords("N3").length,
    N4: getJLPTWords("N4").length,
    N5: getJLPTWords("N5").length,
  };

  const memoryListLength = {
    N1: useGetMemoryList("N1").memoryList.length,
    N2: useGetMemoryList("N2").memoryList.length,
    N3: useGetMemoryList("N3").memoryList.length,
    N4: useGetMemoryList("N4").memoryList.length,
    N5: useGetMemoryList("N5").memoryList.length,
  };
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 pt-24">
      <h1 className="text-4xl font-extrabold">일본어 단어 암기</h1>
      {LEVELS.map((level) => (
        <Button
          disabled={memoryListLength[level] === JLPT_WORDS_LENGTH[level]}
          key={level}
          onClick={() => navigate(`/words/${level}`)}
          className="text-xl"
          name={level}
        >
          {level}
        </Button>
      ))}
    </div>
  );
};

export default MainPage;
