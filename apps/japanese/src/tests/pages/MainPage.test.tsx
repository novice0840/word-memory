import { LEVELS } from "@/constants/word";
import { useGetMemoryList } from "@/hooks/useGetMemoryList";
import { MainPage } from "@/pages";
import { Level } from "@/types/word";
import { getJLPTWords } from "@/utils/word";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("@/utils/word", () => ({
  getJLPTWords: vi.fn(),
}));

vi.mock("@/hooks/useGetMemoryList", () => ({
  useGetMemoryList: vi.fn(),
}));

describe("MainPage Test", () => {
  it("단어장의 있는 모든 단어를 외운 경우, 단어장 버튼이 비활성화된다", () => {
    // Given
    const WORD_TOTAL_LENGTH = 10;
    // N1: 암기 완료, N2: 암기 미완료, N3: 암기 완료, N4: 암기 미완료, N5: 암기 완료
    const COMPLETE_MOCKING = {
      N1: true,
      N2: false,
      N3: true,
      N4: false,
      N5: true,
    };

    (getJLPTWords as Mock).mockImplementation(() => {
      return Array(WORD_TOTAL_LENGTH).fill(null);
    });
    (useGetMemoryList as Mock).mockImplementation((level: Level) => {
      return {
        memoryList: COMPLETE_MOCKING[level]
          ? Array(WORD_TOTAL_LENGTH).fill(null)
          : [],
      };
    });

    // When
    render(<MainPage />);

    // Then
    LEVELS.forEach((level) => {
      const button = screen.getByRole("button", { name: level });
      if (COMPLETE_MOCKING[level]) {
        expect(button).toBeDisabled();
        return;
      }
      expect(button).not.toBeDisabled();
    });
  });
});
