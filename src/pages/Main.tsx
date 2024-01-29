import { Link } from "react-router-dom";
import { Button, Stack, Container } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useEffect } from "react";

const MainPage = () => {
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

  return (
    <Container sx={{ marginTop: "150px" }}>
      <Stack spacing={5} alignItems="center" justifyContent="center">
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
