import { VolumeHigh } from "@mynaui/icons-react";

interface SentencesProps {
  sentences: {
    korean: string;
    original: string;
  }[];
  showMeaning: boolean;
}

const Sentences = ({ sentences, showMeaning }: SentencesProps) => {
  const handleVoiceClick = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";

    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find((voice) => voice.lang.startsWith("ja"));

    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }

    speechSynthesis.speak(utterance);
  };

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
                handleVoiceClick(
                  item.original
                    .replace(/<rt>(.*?)<\/rt>/g, "")
                    .replace(/<[^>]+>/g, "")
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
