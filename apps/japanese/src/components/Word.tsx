interface WordProps {
  original: string | null;
  pronunciation: string;
  koreans: string[];
  showMeaning: boolean;
}

const Word = ({ original, pronunciation, koreans, showMeaning }: WordProps) => {
  return (
    <div className="text-center h-32">
      <div className="text-4xl font-japanese mb-2">
        {original?.split("·").join(", ") || pronunciation}
      </div>
      {showMeaning && (
        <div>
          <div>{original && pronunciation}</div>
          <div>{koreans?.join(", ")}</div>
        </div>
      )}
    </div>
  );
};

export default Word;
