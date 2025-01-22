import { Link, Outlet, useParams } from "react-router-dom";
import { Menu, Cog, Home } from "@mynaui/icons-react";
import { LEVELS } from "@/constants/word";
import type { Level } from "@/types/word";
import { useState } from "react";
import WordList from "@/components/WordList";
import Setting from "@/components/Setting";

const AppLayout = () => {
  const { level } = useParams();
  const [isWordListOpen, setIsWordListOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const handleMenuClick = () => {
    setIsWordListOpen((prev) => !prev);
  };

  const handleWordListClose = () => {
    setIsWordListOpen(false);
  };

  const handleSettingClick = () => {
    setIsSettingOpen((prev) => !prev);
  };

  const handleResetClick = (level: Level) => {
    console.log(level);
  };

  return (
    <div className="max-w-96 mx-auto relative h-screen overflow-hidden">
      <div
        className={`h-full flex flex-col transition-transform duration-300 ${
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
          <div className="relative">
            <Cog onClick={handleSettingClick} />
            <Setting
              isSettingOpen={isSettingOpen}
              onResetClick={handleResetClick}
            />
          </div>
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
