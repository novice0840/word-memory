import { Outlet } from "react-router-dom";
import { useState } from "react";
import { WordList } from "@/components";
import Header from "@/components/Header";
import { DialogProvider } from "@/context/DialogContext";

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
      <div className="max-w-xl mx-auto relative h-screen overflow-hidden">
        <div
          className={`h-full flex flex-col transition-transform duration-300 p-4 ${
            isWordListOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <Header onMenuClick={handleMenuClick} />
          <Outlet />
        </div>

        <WordList
          isWordListOpen={isWordListOpen}
          onWordListClose={handleWordListClose}
        />
      </div>
    </DialogProvider>
  );
};

export default AppLayout;
