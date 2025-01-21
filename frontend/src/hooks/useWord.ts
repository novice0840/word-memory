import { useState } from "react";

export const useWord = () => {
  const [showWordMeaning, setShowWordMeaning] = useState(false);
  const [showExampleSentencesMeaning, setShowExampleSentencesMeaning] =
    useState(false);

  const initWord = () => {
    setShowWordMeaning(false);
    setShowExampleSentencesMeaning(false);
  };

  return {
    showWordMeaning,
    showExampleSentencesMeaning,
    setShowWordMeaning,
    setShowExampleSentencesMeaning,
    initWord,
  };
};
