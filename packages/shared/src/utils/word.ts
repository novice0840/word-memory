import {
  HSK_1_WORDS,
  HSK_2_WORDS,
  HSK_3_WORDS,
  HSK_4_WORDS,
  HSK_5_WORDS,
  HSK_6_WORDS,
} from "data";

export const getNextIndex = (curIndex: number, totalLength: number) => {
  return (curIndex + 1) % totalLength;
};

export const getPrevIndex = (curIndex: number, totalLength: number) => {
  return curIndex > 0 ? curIndex - 1 : totalLength - 1;
};

export const getNextUnmemorizedIndex = (
  curIndex: number,
  memoryList: number[],
  totalLength: number
) => {
  if (memoryList.length === totalLength) {
    return null;
  }

  let nextIndex = (curIndex + 1) % totalLength;
  while (memoryList.includes(nextIndex)) {
    nextIndex = (nextIndex + 1) % totalLength;
  }
  return nextIndex;
};

export const readSentence = (
  text: string,
  language: "japanese" | "chinese" | "english"
) => {
  const langToTag = {
    japanese: "ja-JP",
    chinese: "zh-CN",
    english: "en-US",
  };

  if (!window.speechSynthesis) {
    console.error("음성 합성이 지원되지 않는 브라우저입니다.");
    return;
  }

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langToTag[language];

    const voices = window.speechSynthesis.getVoices();
    const preferredVoices: Record<string, string> = {
      "ja-JP": "Microsoft Haruka - Japanese (Japan)",
      "zh-CN": "Google 普通话（中国大陆）",
      "en-US": "Google US English",
    };

    const selectedVoice = voices.find(
      (voice) =>
        voice.name.normalize().replace(/\s+/g, "") ===
        preferredVoices[langToTag[language]].normalize().replace(/\s+/g, "")
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      console.warn(
        `선택한 언어(${language})에 대한 특정 보이스를 찾지 못했습니다. 기본 보이스 사용.`
      );
    }
    speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = speakText;
  } else {
    speakText();
  }
};

const LEVELS = ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"] as const;
type Level = (typeof LEVELS)[number];

type Word = {
  koreans: string[];
  pronunciation: string;
  original: string | null;
  level: Level;
  sentences: {
    korean: string;
    original: string;
    pronunciation: string;
  }[];
};

export const isValidLevel = (level: string, language: string): boolean => {
  if (language === "chinese") {
    return LEVELS.some((l) => l === level);
  }
  throw new Error("지원하지 않는 언어입니다.");
};

export const getWords = (level: string, language: string) => {
  if (language === "chinese") {
    const HSK_WORDS_MAP = {
      HSK1: HSK_1_WORDS,
      HSK2: HSK_2_WORDS,
      HSK3: HSK_3_WORDS,
      HSK4: HSK_4_WORDS,
      HSK5: HSK_5_WORDS,
      HSK6: HSK_6_WORDS,
    } as Record<Level, Word[]>;

    if (!isValidLevel(level, "chinese")) {
      return [];
    }

    return HSK_WORDS_MAP[level as Level];
  }

  throw new Error("지원하지 않는 언어입니다.");
};
