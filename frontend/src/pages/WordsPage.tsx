import { Navigate, useParams } from "react-router-dom";
import { setLocalStorage } from "@/hooks/useLocalStorage";
import { LEVELS } from "@/constants/word";
import { StudyAction, StudyProgress, Sentences, Word } from "@/components";
import { getJLPTWords, getNextIndex, getPrevIndex } from "@/utils/word";
import type { Level, Word as WordType } from "@/types/word";
import { useStudyAction } from "@/hooks/useStudyAction";
import { useGetMemoryList } from "@/hooks/useGetMemoryList";

const WordsPage = () => {
  const { level = "" } = useParams();
  const words = getJLPTWords(level as Level) as WordType[];
  const { memoryList, curIndex } = useGetMemoryList(level as Level);
  const {
    handleStudyActionClick,
    showWordMeaning,
    showSentencesMeaning,
    initWord,
  } = useStudyAction();
  const totalLength = words.length;

  const { kanji, pronunciation, koreans, sentences } = words[curIndex];

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

  if (!LEVELS.includes(level as Level) || memoryList?.length === totalLength) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-between p-4">
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
            kanji={kanji}
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
