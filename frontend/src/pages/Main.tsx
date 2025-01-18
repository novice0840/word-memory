import { Link } from "react-router-dom";
import { Button, Stack, Container } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useEffect, useState } from "react";

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
    ? sampleSentece // 그대로 출력
    : sampleSentece.replace(/<rt>(.*?)<\/rt>/g, ""); // <rt> 태그 제거

  return (
    <Container sx={{ marginTop: "150px" }}>
      <Stack spacing={5} alignItems="center" justifyContent="center">
        <button onClick={() => setShowRt((prev) => !prev)}>
          {showRt ? "Hide Pronunciation" : "Show Pronunciation"}
        </button>
        <div
          dangerouslySetInnerHTML={{
            __html: showSentence,
          }}
        />
        <Link to="/N1">
          <Button variant="contained" startIcon={<TagFacesIcon />}>
            N1
          </Button>
        </Link>
        <Link to="/N2">
          <Button variant="contained" startIcon={<TagFacesIcon />}>
            N2
          </Button>
        </Link>
        <Link to="/N3">
          <Button variant="contained" startIcon={<TagFacesIcon />}>
            N3
          </Button>
        </Link>
        <Link to="/N4">
          <Button variant="contained" startIcon={<TagFacesIcon />}>
            N4
          </Button>
        </Link>
        <Link to="/N5">
          <Button variant="contained" startIcon={<TagFacesIcon />}>
            N5
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default MainPage;
