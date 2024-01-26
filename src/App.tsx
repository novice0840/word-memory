import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/Main";
import WordSetPage from "./pages/WordSet";
// import { Box, Button, Container, CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/:rate",
    element: <WordSetPage />,
  },
]);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
