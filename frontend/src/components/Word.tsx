interface WordProps {
  kanji: string | null;
  pronunciation: string;
  koreans: string[];
  showMeaning: boolean;
}

const Word = ({ kanji, pronunciation, koreans, showMeaning }: WordProps) => {
  return (
    <div className="text-center h-32">
      <div className="text-4xl">
        {kanji?.split("·").map((item) => <div key={item}>{item}</div>) ||
          pronunciation}
      </div>
      {showMeaning ? (
        <div>
          <div>{kanji && pronunciation}</div>
          <div>{koreans?.join(", ")}</div>
        </div>
      ) : (
        <div>뜻 보기</div>
      )}
    </div>
  );
};

export default Word;
