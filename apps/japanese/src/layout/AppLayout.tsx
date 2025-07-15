import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { StudyAction, WordList } from "@/components";
import { DialogProvider } from "shared/context";
import { Header } from "shared/components";
import { LEVELS } from "@/constants/word";

const AppLayout = () => {
  const [isWordListOpen, setIsWordListOpen] = useState(false);
  const location = useLocation();
  const isWordsPage = location.pathname.startsWith("/words/");

  const handleMenuClick = () => {
    setIsWordListOpen((prev) => !prev);
  };

  const handleWordListClose = () => {
    setIsWordListOpen(false);
  };

  return (
    <DialogProvider>
      <div className="max-w-xl mx-auto relative h-screen overflow-hidden">
        <div
          className={`h-full flex flex-col duration-300 p-4 ${
            isWordListOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <Header
            onMenuClick={handleMenuClick}
            levels={LEVELS as unknown as string[]}
          />
          <Outlet />
        </div>

        <WordList
          isWordListOpen={isWordListOpen}
          onWordListClose={handleWordListClose}
        />
      </div>
      {isWordsPage && !isWordListOpen && <StudyAction />}
    </DialogProvider>
  );
};

export default AppLayout;
