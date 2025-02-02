import { Navigate, useParams } from "react-router-dom";
import { setLocalStorage } from "shared/hooks";
import { StudyAction, StudyProgress, Sentences, Word } from "@/components";
import { getNextIndex, getPrevIndex } from "shared/utils";
import { useStudyAction } from "@/hooks/useStudyAction";
import { useGetMemoryList } from "shared/hooks";
import { getWords, isValidLevel } from "@/utils/word";

const WordsPage = () => {
  const { level = "" } = useParams();
  const words = getWords(level);
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

  if (!isValidLevel(level)) {
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
