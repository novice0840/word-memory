import { Outlet } from "react-router-dom";
import { Menu, Cog, Home } from "@mynaui/icons-react";

const AppLayout = () => {
  return (
    <div>
      <header className="flex justify-between p-4 mb-4 ">
        <Menu />
        <Home />
        <Cog />
      </header>
      <Outlet />
    </div>
  );
};

export default AppLayout;
