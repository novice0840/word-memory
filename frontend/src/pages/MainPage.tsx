import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LEVELS } from "@/constants/word";

const MainPage = () => {
  return (
    <div className="flex flex-col items-center gap-6 pt-24">
      <h1 className="text-4xl font-extrabold">일본어 단어 암기</h1>
      {LEVELS.map((level) => (
        <Button key={level} asChild className="text-xl">
          <Link to={`/words/${level}`}>{level}</Link>
        </Button>
      ))}
    </div>
  );
};

export default MainPage;
