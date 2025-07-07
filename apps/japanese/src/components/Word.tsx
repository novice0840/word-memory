import { useSearchParams } from "react-router-dom";

interface WordProps {
  original: string | null;
  pronunciation: string;
  koreans: string[];
  showMeaning: boolean;
}

const Word = ({ original, pronunciation, koreans, showMeaning }: WordProps) => {
  const [searchParams] = useSearchParams();
  const isWordMeaningVisible =
    searchParams.get("isWordMeaningVisible") === "true";

  return (
    <div className="text-center h-32">
      <div className="text-4xl font-japanese mb-2">
        {original?.split("·").join(", ") || pronunciation}
      </div>
      {isWordMeaningVisible && (
        <div>
          <div>{original && pronunciation}</div>
          <div>{koreans?.join(", ")}</div>
        </div>
      )}
    </div>
  );
};

export default Word;
