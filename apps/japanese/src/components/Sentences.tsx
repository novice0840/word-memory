import { Volume2 } from "lucide-react";
import { readSentence } from "shared/utils";
import { useState } from "react";

interface SentencesProps {
  sentences: {
    korean: string;
    original: string;
  }[];
  showMeaning: boolean;
}

const Sentences = ({ sentences, showMeaning }: SentencesProps) => {
  const [readingIndex, setReadingIndex] = useState<number | null>(null);

  const handleReadSentence = (text: string, index: number) => {
    setReadingIndex(index);
    readSentence(text, "japanese")
      .then(() => {
        // 음성 읽기가 완료된 후 실행됨
        setReadingIndex(null);
      })
      .catch((error) => {
        console.error("음성 읽기 오류:", error);
        setReadingIndex(null);
      });
  };

  return (
    <div className="h-64 overflow-auto w-full text-xl rounded-md border p-x-4 space-y-4">
      {sentences.map((item, index) => (
        <div key={index}>
          <div className="flex items-center space-x-2  ">
            <div
              className="font-japanese"
              dangerouslySetInnerHTML={{
                __html: showMeaning
                  ? item.original
                  : item.original.replace(/<rt>(.*?)<\/rt>/g, ""),
              }}
            />
            <button
              onClick={() =>
                handleReadSentence(
                  item.original
                    .replace(/<rt>(.*?)<\/rt>/g, "")
                    .replace(/<[^>]+>/g, ""),
                  index
                )
              }
            >
              <Volume2
                className={
                  readingIndex === index ? "font-bold stroke-2" : "stroke-1"
                }
              />
            </button>
          </div>

          <div>{showMeaning && item.korean}</div>
        </div>
      ))}
    </div>
  );
};

export default Sentences;
