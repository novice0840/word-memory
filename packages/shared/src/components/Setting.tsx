import { useDialog } from "shared/context";
import { Button } from "shared/ui";
import { setLocalStorage } from "shared/hooks";
import { useNavigate } from "react-router-dom";
interface SettingProps {
  isSettingOpen: boolean;
  levels: string[];
}

const Setting = ({ isSettingOpen, levels }: SettingProps) => {
  const { open } = useDialog();
  const navigate = useNavigate();

  const handleResetClick = (level: string) => {
    open({
      title: `${level} 단어장 초기화`,
      description: "정말로 초기화하시겠습니까?",
      onConfirmClick: () => {
        setLocalStorage(level, { memoryList: [], curIndex: 1 });
        window.location.href = "/";
      },
    });
  };

  return (
    <div
      aria-label="setting"
      className={`absolute right-0 top-6 bg-white rounded border w-64   transition-all duration-300 transform  p-2
            ${
              isSettingOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 z-[-1]"
            }`}
    >
      <div className="text-center mb-2">설정</div>
      <ul className="space-y-2">
        {levels.map((level) => (
          <li key={level}>
            <div className="flex justify-between items-center border rounded p-2">
              <span>{level}</span>
              <Button onClick={() => handleResetClick(level)}>초기화</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Setting;
