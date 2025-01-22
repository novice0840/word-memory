import { Link, Outlet, useParams } from "react-router-dom";
import { Menu, Cog, Home } from "@mynaui/icons-react";
import { LEVELS } from "@/constants/word";
import type { Level } from "@/types/word";
import { useState } from "react";
import WordList from "@/components/WordList";

const AppLayout = () => {
  const { level } = useParams();
  const [isWordListOpen, setIsWordListOpen] = useState(false);

  const handleMenuClick = () => {
    setIsWordListOpen((prev) => !prev);
  };

  const handleWordListClose = () => {
    setIsWordListOpen(false);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className={`container mx-auto h-full flex flex-col transition-transform duration-300 ${
          isWordListOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <header className="flex justify-between p-4">
          {LEVELS.includes(level as Level) ? (
            <Menu onClick={handleMenuClick} />
          ) : (
            <div className="w-6 h-6" />
          )}
          <Link to={`/`}>
            <Home />
          </Link>
          <Cog />
        </header>
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
