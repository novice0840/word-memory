import {
  HSK_1_WORDS,
  HSK_2_WORDS,
  HSK_3_WORDS,
  HSK_4_WORDS,
  HSK_5_WORDS,
  HSK_6_WORDS,
  JLPT_N1_WORDS,
  JLPT_N2_WORDS,
  JLPT_N3_WORDS,
  JLPT_N4_WORDS,
  JLPT_N5_WORDS,
  TOEIC_WORDS,
  TOEFL_WORDS,
  FRENCH_A1_WORDS,
  FRENCH_A2_WORDS,
  FRENCH_B1_WORDS,
  FRENCH_B2_WORDS,
  FRENCH_C1_WORDS,
  FRENCH_C2_WORDS,
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
  language: "japanese" | "chinese" | "english" | "french"
): Promise<void> => {
  const langToTag = {
    japanese: "ja-JP",
    chinese: "zh-CN",
    english: "en-US",
    french: "fr-FR",
  };

  if (!window.speechSynthesis) {
    console.error("음성 합성이 지원되지 않는 브라우저입니다.");
    return Promise.reject("음성 합성이 지원되지 않습니다.");
  }

  return new Promise((resolve, reject) => {
    const speakText = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langToTag[language];

      // 이벤트 리스너 추가
      utterance.onend = () => {
        console.log("Speech synthesis finished");
        resolve();
      };
      
      utterance.onerror = (event) => {
        console.error("Speech synthesis error", event);
        reject(event);
      };

      const voices = window.speechSynthesis.getVoices();
      const preferredVoices: Record<string, string> = {
        "ja-JP": "Microsoft Haruka - Japanese (Japan)",
        "zh-CN": "Google 普通话（中国大陆）",
        "en-US": "Google US English",
        "fr-FR": "Google français",
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
      console.log("Before Speak");
      speechSynthesis.speak(utterance);
      console.log("After Speak");
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = speakText;
    } else {
      speakText();
    }
  });
};

const CHINESE_LEVELS = [
  "HSK1",
  "HSK2",
  "HSK3",
  "HSK4",
  "HSK5",
  "HSK6",
] as const;
const JAPANESE_LEVELS = ["N1", "N2", "N3", "N4", "N5"] as const;
const ENGLISH_LEVELS = ["TOEIC", "TOEFL"] as const;
const FRENCH_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

type ChineseLevel = (typeof CHINESE_LEVELS)[number];
type JAPANESELevel = (typeof JAPANESE_LEVELS)[number];
type ENGLISHLevel = (typeof ENGLISH_LEVELS)[number];
type FRENCHLevel = (typeof FRENCH_LEVELS)[number];

type Word = {
  koreans: string[];
  pronunciation: string;
  original: string | null;
  level: string;
  sentences: {
    korean: string;
    original: string;
    pronunciation: string;
  }[];
};

export const isValidLevel = (level: string, language: string): boolean => {
  if (language === "chinese") {
    return CHINESE_LEVELS.some((l) => l === level);
  } else if (language === "japanese") {
    return JAPANESE_LEVELS.some((l) => l === level);
  } else if (language === "english") {
    return ENGLISH_LEVELS.some((l) => l === level);
  } else if (language === "french") {
    return FRENCH_LEVELS.some((l) => l === level);
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
    } as Record<ChineseLevel, Word[]>;

    if (!isValidLevel(level, "chinese")) {
      return [];
    }

    return HSK_WORDS_MAP[level as ChineseLevel];
  } else if (language === "japanese") {
    const levelWords = {
      N1: JLPT_N1_WORDS,
      N2: JLPT_N2_WORDS,
      N3: JLPT_N3_WORDS,
      N4: JLPT_N4_WORDS,
      N5: JLPT_N5_WORDS,
    } as Record<JAPANESELevel, Word[]>;

    if (!isValidLevel(level, "japanese")) {
      return [];
    }

    return levelWords[level as JAPANESELevel];
  } else if (language === "english") {
    const WORDS_MAP = {
      TOEIC: TOEIC_WORDS,
      TOEFL: TOEFL_WORDS,
    } as Record<ENGLISHLevel, Word[]>;

    if (!isValidLevel(level, "english")) {
      return [];
    }

    return WORDS_MAP[level as ENGLISHLevel];
  } else if (language === "french") {
    const WORDS_MAP = {
      A1: FRENCH_A1_WORDS,
      A2: FRENCH_A2_WORDS,
      B1: FRENCH_B1_WORDS,
      B2: FRENCH_B2_WORDS,
      C1: FRENCH_C1_WORDS,
      C2: FRENCH_C2_WORDS,
    } as Record<FRENCHLevel, Word[]>;

    if (!isValidLevel(level, "french")) {
      return [];
    }

    return WORDS_MAP[level as FRENCHLevel];
  }

  throw new Error("지원하지 않는 언어입니다.");
};
