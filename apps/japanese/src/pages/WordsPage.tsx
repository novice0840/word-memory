import { useNavigate, useParams, Navigate } from "react-router-dom";
import { setLocalStorage, useGetMemoryList } from "shared/hooks";
import { StudyAction, Sentences, Word } from "@/components";
import { StudyProgress } from "shared/components";
import {
  getNextIndex,
  getPrevIndex,
  getWords,
  isValidLevel,
} from "shared/utils";
import { useStudyAction } from "@/hooks/useStudyAction";

const WordsPage = () => {
  const { level = "" } = useParams();
  const words = getWords(level, "japanese");
  const totalLength = words.length;
  const { memoryList, curIndex } = useGetMemoryList(level);
  const { handleStudyActionClick, initWord } = useStudyAction();
  const navigate = useNavigate();

  const { original, pronunciation, koreans, sentences } = words[curIndex];

  const handleGoPrevWord = () => {
    const prevIndex = getPrevIndex(curIndex, totalLength);
    initWord();
    setLocalStorage(level, { memoryList, curIndex: prevIndex });
    navigate(`/words/${level}/${prevIndex}`);
  };

  const handleGoNextWord = () => {
    const nextIndex = getNextIndex(curIndex, totalLength);
    initWord();
    setLocalStorage(level, { memoryList, curIndex: nextIndex });
    navigate(`/words/${level}/${nextIndex}`);
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

      <StudyAction onClick={handleStudyActionClick} />
    </main>
  );
};

export default WordsPage;
