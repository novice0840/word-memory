import { create } from "zustand";

interface WordStatusState {
  isWordMeaningVisible: boolean;
  isSentenceMeaningVisible: boolean;
  changeIsWordMeaningVisible: (visible: boolean) => void;
  changeIsSentenceMeaningVisible: (visible: boolean) => void;
  resetWordStatusStore: () => void;
}

export const useWordStatusStore = create<WordStatusState>((set) => ({
  isWordMeaningVisible: false,
  isSentenceMeaningVisible: false,
  changeIsWordMeaningVisible: (visible: boolean) =>
    set({ isWordMeaningVisible: visible }),
  changeIsSentenceMeaningVisible: (visible: boolean) =>
    set({ isSentenceMeaningVisible: visible }),
  resetWordStatusStore: () => {
    set({
      isWordMeaningVisible: false,
      isSentenceMeaningVisible: false,
    });
  },
}));
