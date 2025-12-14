import { Volume2 } from "lucide-react";
import { readSentence } from "shared/utils";
import { useState } from "react";
import { flushSync } from "react-dom";
import { useWordStatusStore } from "@/store/useWordStatusStore";

interface SentencesProps {
  sentences: {
    korean: string;
    original: string;
  }[];
}

const removeHurigana = (japaneseText: string) => {
  return japaneseText.replace(/<rt>(.*?)<\/rt>/g, "").replace(/<[^>]+>/g, "");
};

const extractPronunciation = (japaneseText: string) => {
  return japaneseText.replace(/<rb>(.*?)<\/rb>/g, "").replace(/<[^>]+>/g, "");
};

const Sentences = ({ sentences }: SentencesProps) => {
  const [readingIndex, setReadingIndex] = useState<number | null>(null);
  const isSentenceMeaningVisible = useWordStatusStore(
    (state) => state.isSentenceMeaningVisible
  );
  const isReadingSentence = readingIndex !== null;

  const handleReadSentence = (text: string, index: number) => {
    flushSync(() => {
      setReadingIndex(index);
    });
    readSentence(text, "japanese")
      .catch((error) => {
        console.error("음성 읽기 오류:", error);
      })
      .finally(() => {
        setReadingIndex(null);
      });
  };

  return (
    <div className="h-96 overflow-auto w-full text-xl rounded-md border p-x-4 space-y-4">
      {sentences.map((item, index) => (
        <div key={index}>
          <div className="flex items-center space-x-2">
            <div
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
                handleReadSentence(extractPronunciation(item.original), index)
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
