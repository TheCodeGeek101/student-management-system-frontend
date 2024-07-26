"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "../Shared/Sidebar";
import Header from "../Shared/Header";

interface DefaultLayoutProps {
   // Replace `any` with a more specific type if possible
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({  children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          <Header  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
