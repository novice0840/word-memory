import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ERROR_PAGE_TITLE, ERROR_PAGE_BUTTON_TEXT } from "@/constants/message";
import { routes } from "@/App";

describe("ErrorPage Test", () => {
  it("잘못된 URL에 접속하면 ErrorPage가 렌더링된다", () => {
    // Given
    const router = createMemoryRouter(routes, {
      initialEntries: ["/error"],
    });

    // When
    render(<RouterProvider router={router} />);

    // Then
    expect(screen.getByText(ERROR_PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(ERROR_PAGE_BUTTON_TEXT)).toBeInTheDocument();
  });
});
