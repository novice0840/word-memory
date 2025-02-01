import { Navigate, useParams } from "react-router-dom";
import { setLocalStorage } from "@/hooks/useLocalStorage";
import { HSK_LEVELS } from "@/constants/word";
import { StudyAction, StudyProgress, Sentences, Word } from "@/components";
import { getNextIndex, getPrevIndex } from "@shared/ui/utils";
import type { HSKLevel } from "@/types/word";
import { useStudyAction } from "@/hooks/useStudyAction";
import { useGetMemoryList } from "@/hooks/useGetMemoryList";
import { getHSKWords } from "@/utils/chinese";

const WordsPage = () => {
  const { level = "" } = useParams();
  const words = getHSKWords(level);
  const totalLength = words.length;
  const { memoryList, curIndex } = useGetMemoryList(level);
  const {
    handleStudyActionClick,
    showWordMeaning,
    showSentencesMeaning,
    initWord,
  } = useStudyAction();

  const { original, pronunciation, koreans, sentences } = words[curIndex];

  const handleGoPrevWord = () => {
    const prevIndex = getPrevIndex(curIndex, totalLength);
    initWord();
    setLocalStorage(level, { memoryList, curIndex: prevIndex });
  };

  const handleGoNextWord = () => {
    const nextIndex = getNextIndex(curIndex, totalLength);
    initWord();
    setLocalStorage(level, { memoryList, curIndex: nextIndex });
  };

  if (!HSK_LEVELS.includes(level as HSKLevel)) {
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
            showMeaning={showWordMeaning}
          />
          <Sentences sentences={sentences} showMeaning={showSentencesMeaning} />
        </section>
      </section>

      <StudyAction onClick={handleStudyActionClick} />
    </main>
  );
};

export default WordsPage;
