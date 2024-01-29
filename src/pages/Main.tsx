import { Link } from "react-router-dom";
import { Button, Stack, Container } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const MainPage = () => {
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
