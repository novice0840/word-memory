import { LEVELS } from "@/constants/word";
import { Button } from "./ui/button";
import { Level } from "@/types/word";

interface SettingProps {
  isSettingOpen: boolean;
  onResetClick: (level: Level) => void;
}

const Setting = ({ isSettingOpen, onResetClick }: SettingProps) => {
  return (
    <div
      className={`absolute right-0 top-6 bg-white rounded border w-64   transition-all duration-300 transform  p-2
            ${isSettingOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          }`}
    >
      <div className="text-center mb-2">설정</div>
      <ul className="space-y-2">
        {LEVELS.map((level) => (
          <li key={level}>
            <div className="flex justify-between items-center border rounded p-2">
              <span>{level}</span>
              <Button onClick={() => onResetClick(level)}>초기화</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Setting;
