import { HSK_LEVELS } from "@/constants/word";
import { HSKLevel } from "@/types/word";
import { Cog, Home, Menu } from "@mynaui/icons-react";
import { useState } from "react";
import Setting from "./Setting";
import { useParams, Link } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { level } = useParams();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const handleSettingClick = () => {
    setIsSettingOpen((prev) => !prev);
  };

  return (
    <header className="flex justify-between">
      {HSK_LEVELS.includes(level as HSKLevel) ? (
        <button aria-label="menuIcon" onClick={onMenuClick}>
          <Menu />
        </button>
      ) : (
        <div className="w-6 h-6" />
      )}
      <Link to={`/`} aria-label="homeIcon">
        <Home />
      </Link>
      <div className="relative">
        <button aria-label="cogIcon" onClick={handleSettingClick}>
          <Cog />
        </button>
        <Setting isSettingOpen={isSettingOpen} />
      </div>
    </header>
  );
};

export default Header;
