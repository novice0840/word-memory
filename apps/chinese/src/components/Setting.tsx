import { HSK_LEVELS } from "@/constants/word";
import { useDialog } from "@shared/ui/context";
import { Button } from "@shared/ui/button";
import { setLocalStorage } from "@/hooks/useLocalStorage";
interface SettingProps {
  isSettingOpen: boolean;
}

const Setting = ({ isSettingOpen }: SettingProps) => {
  const { open } = useDialog();

  const handleResetClick = (level: string) => {
    open({
      title: `${level} 단어장 초기화`,
      description: "정말로 초기화하시겠습니까?",
      onConfirmClick: () => {
        setLocalStorage(level, { memoryList: [], curIndex: 0 });
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
        {HSK_LEVELS.map((level) => (
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
