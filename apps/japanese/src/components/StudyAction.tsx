import { Button } from "shared/ui";
import { getNextUnmemorizedIndex, getWords } from "shared/utils";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { setLocalStorage, useGetMemoryList } from "shared/hooks";
import { useDialog } from "shared/context";

const StudyAction = () => {
  const { level = "" } = useParams();
  const words = getWords(level, "japanese");
  const totalLength = words.length;
  const { memoryList, curIndex } = useGetMemoryList(level);
  const [searchParams, setSearchParams] = useSearchParams();
  const isWordMeaningVisible =
    searchParams.get("isWordMeaningVisible") === "true";
  const isSentenceMeaningVisible =
    searchParams.get("isSentenceMeaningVisible") === "true";
  const isAllWordsMemorized = [...Array(totalLength).keys()].every((i) =>
    memoryList.includes(i)
  );
  const { open } = useDialog();
  const navigate = useNavigate();
  const nextIndex = getNextUnmemorizedIndex(curIndex, memoryList, totalLength);

  const handleClickMeaningButton = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(
      "isWordMeaningVisible",
      isWordMeaningVisible ? "false" : "true"
    );
    setSearchParams(newParams);
  };

  const handleClickSentenceButton = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(
      "isSentenceMeaningVisible",
      isSentenceMeaningVisible ? "false" : "true"
    );
    setSearchParams(newParams);
  };

  const handleClickMemorizationButton = () => {
    setLocalStorage(level, {
      memoryList: memoryList.includes(curIndex)
        ? memoryList
        : [...memoryList, curIndex],
      curIndex: nextIndex,
    });

    if (memoryList.length === totalLength - 1) {
      open({
        title: "모든 단어를 외웠습니다 🎉",
        description: "확인 버튼을 누르면 홈으로 돌아갑니다",
        onConfirmClick: () => {
          navigate("/");
        },
      });
      return;
    }
    navigate(`/words/${level}/${nextIndex}`);
  };
  const handleClickAgainButton = () => {
    setLocalStorage(level, { memoryList, curIndex: nextIndex });
    navigate(`/words/${level}/${nextIndex}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="max-w-xl mx-auto p-2 h-32 grid grid-cols-2 grid-rows-2 gap-8">
        <Button
          id="meaning"
          onClick={handleClickMeaningButton}
          className="h-full"
        >
          {isWordMeaningVisible ? "뜻 숨기기" : "뜻 보기"}
        </Button>
        <Button
          id="sentence"
          onClick={handleClickSentenceButton}
          className="h-full"
        >
          {isSentenceMeaningVisible ? "예문 해석 숨기기" : "예문 해석 보기"}
        </Button>
        <Button
          disabled={isAllWordsMemorized}
          id="memorization"
          onClick={handleClickMemorizationButton}
          className="h-full"
        >
          암기 완료
        </Button>
        <Button
          disabled={isAllWordsMemorized}
          id="again"
          onClick={handleClickAgainButton}
          className="h-full"
        >
          다시 외우기
        </Button>
      </div>
    </div>
  );
};

export default StudyAction;
