import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layout/AppLayout.tsx";
import { MainPage, WordsPage } from "@/pages";
import { ErrorPage } from "shared/pages";
import { DialogProvider } from "shared/context";

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
    <DialogProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </DialogProvider>
  );
}

export { routes };
export default App;
