import { Outlet } from "react-router-dom";
import { useState } from "react";
import { WordList } from "@/components";
import { DialogProvider } from "shared/context";
import { Header } from "shared/components";
import { LEVELS } from "@/constants/word";

const AppLayout = () => {
  const [isWordListOpen, setIsWordListOpen] = useState(false);

  const handleMenuClick = () => {
    setIsWordListOpen((prev) => !prev);
  };

  const handleWordListClose = () => {
    setIsWordListOpen(false);
  };

  return (
    <DialogProvider>
      <div className="max-w-xl mx-auto relative overflow-hidden">
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
      <button className="fixed-bottom-button">버튼 텍스트</button>
    </DialogProvider>
  );
};

export default AppLayout;
