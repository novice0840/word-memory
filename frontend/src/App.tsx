import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layout/AppLayout.tsx";
import { ErrorPage, MainPage, WordsPage } from "@/pages";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/words/:level", element: <WordsPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export { routes };
export default App;
