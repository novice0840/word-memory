import { useState } from "react";

export const useWord = () => {
  const [showWordMeaning, setShowWordMeaning] = useState(false);
  const [showSentencesMeaning, setShowSentencesMeaning] = useState(false);

  const initWord = () => {
    setShowWordMeaning(false);
    setShowSentencesMeaning(false);
  };

  return {
    showWordMeaning,
    showSentencesMeaning,
    setShowWordMeaning,
    setShowSentencesMeaning,
    initWord,
  };
};
