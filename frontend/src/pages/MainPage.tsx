import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const MainPage = () => {
  const [showRt, setShowRt] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("N1")) {
      localStorage.setItem("N1", JSON.stringify([]));
    }
    if (!localStorage.getItem("N2")) {
      localStorage.setItem("N2", JSON.stringify([]));
    }
    if (!localStorage.getItem("N3")) {
      localStorage.setItem("N3", JSON.stringify([]));
    }
    if (!localStorage.getItem("N4")) {
      localStorage.setItem("N4", JSON.stringify([]));
    }
    if (!localStorage.getItem("N5")) {
      localStorage.setItem("N5", JSON.stringify([]));
    }
  }, []);

  const sampleSentece =
    "<ruby><rb>父親</rb><rt>ちちおや</rt></ruby>の<ruby><rb>権勢</rb><rt>けんせい</rt></ruby>に<ruby><rb>頼</rb><rt><strong>たよ</strong></rt></ruby><strong>る</strong>.";
  const showSentence = showRt
    ? sampleSentece
    : sampleSentece.replace(/<rt>(.*?)<\/rt>/g, "");

  const LEVELS = ["N1", "N2", "N3", "N4", "N5"];

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-extrabold">일본어 단어 암기</h1>
      <Button onClick={() => setShowRt((prev) => !prev)}>
        {showRt ? "Hide Pronunciation" : "Show Pronunciation"}
      </Button>
      <div
        dangerouslySetInnerHTML={{
          __html: showSentence,
        }}
      />
      {LEVELS.map((level) => (
        <Button key={level} asChild className="text-xl">
          <Link to={`/words/${level}`}>{level}</Link>
        </Button>
      ))}
    </div>
  );
};

export default MainPage;
