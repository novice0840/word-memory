import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LEVELS } from "@/constants/word";
import { getJLPTWords } from "@/utils/word";
import { useGetMemoryList } from "@/hooks/useGetMemoryList";

const JLPT_WORDS_LENGTH = {
  N1: getJLPTWords("N1").length,
  N2: getJLPTWords("N2").length,
  N3: getJLPTWords("N3").length,
  N4: getJLPTWords("N4").length,
  N5: getJLPTWords("N5").length,
};

const MainPage = () => {
  const memoryListLength = {
    N1: useGetMemoryList("N1").memoryList.length,
    N2: useGetMemoryList("N2").memoryList.length,
    N3: useGetMemoryList("N3").memoryList.length,
    N4: useGetMemoryList("N4").memoryList.length,
    N5: useGetMemoryList("N5").memoryList.length,
  };

  return (
    <div className="flex flex-col items-center gap-6 pt-24">
      <h1 className="text-4xl font-extrabold">일본어 단어 암기</h1>
      {LEVELS.map((level) => (
        <Button disabled key={level} asChild className="text-xl">
          <Link to={`/words/${level}`}>{level}</Link>
        </Button>
      ))}
    </div>
  );
};

export default MainPage;
