import { Volume2 } from "lucide-react";
import { readSentence } from "shared/utils";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SentencesProps {
  sentences: {
    korean: string;
    original: string;
  }[];
}

const Sentences = ({ sentences }: SentencesProps) => {
  const [readingIndex, setReadingIndex] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const isSentenceMeaningVisible =
    searchParams.get("isSentenceMeaningVisible") === "true";
  const isReadingSentence = readingIndex !== null;

  const handleReadSentence = (text: string, index: number) => {
    setReadingIndex(index);
    readSentence(text, "japanese")
      .catch((error) => {
        console.error("음성 읽기 오류:", error);
      })
      .finally(() => {
        setReadingIndex(null);
      });
  };

  const removeHurigana = (text: string) => {
    return text.replace(/<rt>(.*?)<\/rt>/g, "").replace(/<[^>]+>/g, "");
  };

  return (
    <div className="h-64 overflow-auto w-full text-xl rounded-md border p-x-4 space-y-4">
      {sentences.map((item, index) => (
        <div key={index}>
          <div className="flex items-center space-x-2  ">
            <div
              className="font-japanese"
              dangerouslySetInnerHTML={{
                __html: isSentenceMeaningVisible
                  ? item.original
                  : removeHurigana(item.original),
              }}
            />
            <button
              disabled={isReadingSentence}
              className="disabled:cursor-not-allowed"
              onClick={() =>
                handleReadSentence(removeHurigana(item.original), index)
              }
            >
              <Volume2
                className={
                  readingIndex === index ? "font-bold stroke-2" : "stroke-1"
                }
              />
            </button>
          </div>

          <div>{isSentenceMeaningVisible && item.korean}</div>
        </div>
      ))}
    </div>
  );
};

export default Sentences;
