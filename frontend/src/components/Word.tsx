interface WordProps {
  kanji: string | null;
  pronunciation: string;
  koreans: string[];
  showMeaning: boolean;
}

const Word = ({ kanji, pronunciation, koreans, showMeaning }: WordProps) => {
  return (
    <div className="text-center">
      <div className="text-4xl">
        {kanji?.split("·").map((item) => <div key={item}>{item}</div>) ||
          pronunciation}
      </div>
      <div>{kanji && (showMeaning ? pronunciation : "히라가나 숨김")}</div>
      <div>
        {showMeaning
          ? koreans?.map((item) => <div key={item}>{item}</div>)
          : "한국어 숨김"}
      </div>
    </div>
  );
};

export default Word;
