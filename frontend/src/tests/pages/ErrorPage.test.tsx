import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layout/AppLayout.tsx";
import { ErrorPage, MainPage, WordsPage } from "@/pages";
import { ERROR_PAGE_TITLE } from "@/constants/message";

describe("React Router Error Page", () => {
  it("renders ErrorPage on invalid URL", () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={["/invalid-url"]}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<MainPage />} />
            <Route path="words/:level" element={<WordsPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText(ERROR_PAGE_TITLE)).toBeInTheDocument();
  });
});
