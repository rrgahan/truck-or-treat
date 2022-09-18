import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="px-6 py-4 bg-primary min-h-screen">
      <h1 className="border-bottom-1 pb-4">Hot Food Trucks Near Me</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
