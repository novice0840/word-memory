import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layout/AppLayout.tsx";
import { MainPage, WordsPage } from "@/pages";
import { ErrorPage } from "shared/pages";

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

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </React.Fragment>
  );
}

export default App;
