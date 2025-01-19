import { Link, Outlet } from "react-router-dom";
import { Menu, Cog, Home } from "@mynaui/icons-react";

const AppLayout = () => {
  return (
    <div className="container mx-auto">
      <header className="flex justify-between p-4 mb-4 ">
        <Menu />
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
