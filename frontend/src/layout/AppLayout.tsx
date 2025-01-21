import { Link, Outlet, useParams } from "react-router-dom";
import { Menu, Cog, Home } from "@mynaui/icons-react";
import { LEVELS } from "@/constants/word";
import type { Level } from "@/types/word";

const AppLayout = () => {
  const { level } = useParams();

  return (
    <div className="container mx-auto h-dvh flex flex-col">
      <header className="flex justify-between p-4">
        {LEVELS.includes(level as Level) ? (
          <Menu />
        ) : (
          <div className="w-6 h-6" />
        )}
        <Link to={`/`}>
          <Home />
        </Link>
        <Cog />
      </header>
      <Outlet />
    </div>
  );
};

export default AppLayout;
