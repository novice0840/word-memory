import { readSentence } from "@/utils/word";
import { VolumeHigh } from "@mynaui/icons-react";

interface SentencesProps {
  sentences: {
    korean: string;
    original: string;
    pronunciation: string;
  }[];
  showMeaning: boolean;
}

const Sentences = ({ sentences, showMeaning }: SentencesProps) => {
  return (
    <div className="h-64 overflow-auto w-full text-xl rounded-md border p-x-4 space-y-4">
      {sentences.map((item, index) => (
        <div key={index}>
          <div className="flex items-center space-x-2">
            <div>
              <div className="font-chinese">{item.original}</div>
              <div className="text-sm">{showMeaning && item.pronunciation}</div>
            </div>
            <button onClick={() => readSentence(item.original, "chinese")}>
              <VolumeHigh />
            </button>
          </div>

          <div className="text-sm">{showMeaning && item.korean}</div>
        </div>
      ))}
    </div>
  );
};

export default Sentences;
