import { HSK_LEVELS } from "@/constants/word";
import { HSKLevel } from "@/types/word";
import { Menu, Settings, House } from "lucide-react";
import { useState } from "react";
import { Setting } from "shared/components";
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
        <button className="w-6 h-6" aria-label="menuIcon" onClick={onMenuClick}>
          <Menu />
        </button>
      ) : (
        <div className="w-6 h-6" />
      )}
      <Link to={`/`} aria-label="houseIcon">
        <House />
      </Link>
      <div className="relative w-6 h-6">
        <button
          className="w-6 h-6"
          aria-label="settingsIcon"
          onClick={handleSettingClick}
        >
          <Settings />
        </button>
        <Setting
          isSettingOpen={isSettingOpen}
          levels={["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"]}
        />
      </div>
    </header>
  );
};

export default Header;
