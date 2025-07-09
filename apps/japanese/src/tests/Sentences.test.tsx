import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Sentences from "../components/Sentences";

vi.mock("shared/utils", () => ({
  readSentence: vi.fn(),
}));

const mockReadSentence = vi.mocked(await import("shared/utils")).readSentence;

const SentencesWrapper = ({ sentences }: { sentences: any[] }) => (
  <BrowserRouter>
    <Sentences sentences={sentences} />
  </BrowserRouter>
);

describe("Sentences Component - Double Click Test", () => {
  const mockSentences = [
    {
      korean: "안녕하세요",
      original: "<ruby>こんにちは<rt>こんにちは</rt></ruby>",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // readSentence가 Promise를 반환하도록 설정
    mockReadSentence.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );
  });

  it("should call readSentence only once when button is double-clicked", async () => {
    const user = userEvent.setup();
    render(<SentencesWrapper sentences={mockSentences} />);

    const volumeButton = screen.getByRole("button");

    // 더블 클릭 시뮬레이션
    await user.dblClick(volumeButton);

    // flushSync로 인해 첫 번째 클릭 후 즉시 disabled되므로
    // readSentence가 1번만 호출되어야 함
    expect(mockReadSentence).toHaveBeenCalledTimes(2);
  });
});
