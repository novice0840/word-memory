import { Outlet } from "react-router-dom";
import { useState } from "react";
import { WordList } from "@/components";
import { Header } from "shared/components";

const HSKLevels = ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"];

const AppLayout = () => {
  const [isWordListOpen, setIsWordListOpen] = useState(false);

  const handleMenuClick = () => {
    setIsWordListOpen((prev) => !prev);
  };

  const handleWordListClose = () => {
    setIsWordListOpen(false);
  };

  return (
    <div className="max-w-xl mx-auto relative h-screen overflow-hidden">
      <div
        className={`h-full flex flex-col transition-transform duration-300 p-4 ${
          isWordListOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <Header onMenuClick={handleMenuClick} levels={HSKLevels} />
        <Outlet />
      </div>

      <WordList
        isWordListOpen={isWordListOpen}
        onWordListClose={handleWordListClose}
      />
    </div>
  );
};

export default AppLayout;
