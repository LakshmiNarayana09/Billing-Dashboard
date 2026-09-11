import { useState } from "react";

import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        text-gray-900
        dark:bg-gray-950
        dark:text-white
      "
    >
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="lg:ml-64">
        <Navbar
          onMenuClick={handleOpenSidebar}
        />

        <main className="
          p-4
          sm:p-6
          lg:p-8
        ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;