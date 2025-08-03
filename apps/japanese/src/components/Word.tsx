import { useWordStatusStore } from "@/store/useWordStatusStore";

interface WordProps {
  original: string | null;
  pronunciation: string;
  koreans: string[];
}

const Word = ({ original, pronunciation, koreans }: WordProps) => {
  const isWordMeaningVisible = useWordStatusStore(
    (state) => state.isWordMeaningVisible
  );

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
