import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ERROR_PAGE_TITLE } from "@/constants/message";
import { routes } from "@/App";

describe("ErrorPage Test", () => {
  it("잘못된 URL에 접속하면 ErrorPage가 렌더링된다다", () => {
    const router = createMemoryRouter(routes);

    // Arrange
    render(<RouterProvider router={router} />);

    // Assert
    expect(screen.getByText(ERROR_PAGE_TITLE)).toBeInTheDocument();
  });
});
