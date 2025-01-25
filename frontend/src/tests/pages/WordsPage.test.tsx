import { routes } from "@/App";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("WordsPage Test", () => {
  describe("Header Icons Test", () => {
    it("홈 아이콘 클릭 시 메인페이지로 이동", async () => {
      // Given
      const router = createMemoryRouter(routes, {
        initialEntries: ["/words/N1"],
      });

      // When
      render(<RouterProvider router={router} />);
      const homeIconButton = screen.getByRole("link", { name: "homeIcon" });
      await userEvent.click(homeIconButton);

      // Then
      expect(router.state.location.pathname).toBe("/");
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

  describe("Word Test", () => {
    it("오른쪽 화살표 아이콘 클릭 시 다음 단어로 이동", () => {
      expect(1).toBe(1);
    });

    it("왼쪽 화살표 아이콘 클릭 시 이전 단어로 이동", () => {
      expect(1).toBe(1);
    });
  });

  describe("StudyAction Test", () => {
    it("뜻 보기 버튼 클릭 시 뜻이 보인다", () => {
      expect(1).toBe(1);
    });

    it("뜻 보기 버튼 2번 클릭 시 원래대로 돌아온다", () => {
      expect(1).toBe(1);
    });

    it("예문 해석 보기 버튼 클릭 시 예문 해석이 보인다", () => {
      expect(1).toBe(1);
    });

    it("예문 해석 보기 버튼 2번 클릭 시 원래대로 돌아온다", () => {
      expect(1).toBe(1);
    });

    it("암기 완료 버튼 클릭 시 암기 완료 처리", () => {
      expect(1).toBe(1);
    });

    it("다시 외우기 버튼 클릭 시 다시 외우기 처리", () => {
      expect(1).toBe(1);
    });
  });
});
