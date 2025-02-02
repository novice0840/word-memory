import { Menu, Settings, House } from "lucide-react";
import { useState } from "react";
import { Setting } from "shared/components";
import { useParams, Link } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
  levels: string[];
}

const Header = ({ onMenuClick, levels }: HeaderProps) => {
  const { level = "" } = useParams();
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const handleSettingClick = () => {
    setIsSettingOpen((prev) => !prev);
  };

  return (
    <header className="flex justify-between">
      {levels.includes(level) ? (
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
        <Setting isSettingOpen={isSettingOpen} levels={levels} />
      </div>
    </header>
  );
};

export default Header;
