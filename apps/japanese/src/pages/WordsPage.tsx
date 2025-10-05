import { useParams, Navigate } from "react-router-dom";
import { setLocalStorage, useGetMemoryList } from "shared/hooks";
import { Sentences, Word } from "@/components";
import { StudyProgress } from "shared/components";
import {
  getNextIndex,
  getPrevIndex,
  getWords,
  isValidLevel,
} from "shared/utils";

const WordsPage = () => {
  const { level = "" } = useParams();
  const { memoryList, curIndex } = useGetMemoryList(level);
  const words = getWords(level, "japanese");
  const totalLength = words.length;

  // curIndex는 UI에도 보여지기 때문에 0이 아닌 1부터 시작한다
  const { original, pronunciation, koreans, sentences } = words[curIndex - 1];

  const handleGoPrevWord = () => {
    const prevIndex = getPrevIndex(curIndex, totalLength);
    setLocalStorage(level, { memoryList, curIndex: prevIndex });
  };

  const handleGoNextWord = () => {
    const nextIndex = getNextIndex(curIndex, totalLength);
    setLocalStorage(level, { memoryList, curIndex: nextIndex });
  };

  if (!isValidLevel(level, "japanese")) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-between">
      <section className="w-full">
        <StudyProgress
          curIndex={curIndex}
          memoryListLength={memoryList.length}
          totalLength={totalLength}
          onGoPrevWord={handleGoPrevWord}
          onGoNextWord={handleGoNextWord}
        />
        <section className="w-full max-h-96 overflow-auto">
          <Word
            original={original}
            pronunciation={pronunciation}
            koreans={koreans}
          />
          <Sentences sentences={sentences} />
        </section>
      </section>
    </main>
  );
};

export default WordsPage;
