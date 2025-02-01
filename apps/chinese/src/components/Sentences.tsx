import { readSentence } from "@/utils/word";
import { VolumeHigh } from "@mynaui/icons-react";

interface SentencesProps {
  sentences: {
    korean: string;
    original: string;
  }[];
  showMeaning: boolean;
}

const Sentences = ({ sentences, showMeaning }: SentencesProps) => {
  return (
    <div className="h-64 overflow-auto w-full text-xl rounded-md border p-x-4 space-y-4">
      {sentences.map((item, index) => (
        <div key={index}>
          <div className="flex items-center space-x-2  ">
            <div
              dangerouslySetInnerHTML={{
                __html: showMeaning
                  ? item.original
                  : item.original.replace(/<rt>(.*?)<\/rt>/g, ""),
              }}
            />
            <button
              onClick={() =>
                readSentence(
                  item.original
                    .replace(/<rt>(.*?)<\/rt>/g, "")
                    .replace(/<[^>]+>/g, ""),
                  "chinese"
                )
              }
            >
              <VolumeHigh />
            </button>
          </div>

          <div>{showMeaning && item.korean}</div>
        </div>
      ))}
    </div>
  );
};

export default Sentences;
