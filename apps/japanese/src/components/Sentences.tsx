import { VolumeHigh } from "@mynaui/icons-react";

interface SentencesProps {
  sentences: {
    korean: string;
    japanese: string;
  }[];
  showMeaning: boolean;
}

const Sentences = ({ sentences, showMeaning }: SentencesProps) => {
  const handleVoiceClick = (text: string) => {
    console.log(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP"; // 일본어 설정

    // 사용 가능한 일본어 음성을 찾기
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
                  ? item.japanese
                  : item.japanese.replace(/<rt>(.*?)<\/rt>/g, ""),
              }}
            />
            <button
              onClick={() =>
                handleVoiceClick(
                  item.japanese
                    .replace(/<rt>(.*?)<\/rt>/g, "")
                    .replace(/<\/?(ruby|rb|rt)>/g, "")
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
