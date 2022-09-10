import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="mx-6 my-4">
      <h1 className="border-bottom-1 pb-4">Grub Trucks</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
