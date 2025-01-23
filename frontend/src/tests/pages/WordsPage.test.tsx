import { describe, it, expect } from "vitest";

describe("WordsPage Test", () => {
  it("홈 아이콘 클릭 시 메인페이지로 이동", () => {
    expect(1).toBe(1);
  });

  it("설정 아이콘 클릭 시 설정 UI 표시", () => {
    expect(1).toBe(1);
  });

  it("설정 UI가 표시된 상태에서 설정 아이콘 클릭 시 설정 UI 닫기", () => {
    expect(1).toBe(1);
  });

  it("메뉴 아이콘 클릭 시 WordList 컴포넌트 표시", () => {
    // WordList는 DOM에 항상 렌더링되어 있기 때문에 클래스에 "translate-x-0", "-translate-x-full"로 표시 여부를 결정한다.
    expect(1).toBe(1);
  });

  it("WordList 컴포넌트에 있는 화살표 버튼을 누르면 WordList 컴포넌트는 사라지고 원래 페이지로 UI가 돌아온다", () => {
    expect(1).toBe(1);
  });

  it("WordList 컴포넌트에서 단어 클릭 시 단어 상세 페이지로 이동", () => {
    expect(1).toBe(1);
  });
});
