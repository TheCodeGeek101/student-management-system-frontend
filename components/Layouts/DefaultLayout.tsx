"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "../Shared/Sidebar";
import Header from "../Shared/Header";
import { User } from '../../types/user'; // Import User type from the correct file
import SignOutModal from "../Shared/Header/SignOutModal";

interface DefaultLayoutProps {
  children: ReactNode;
  user: User; // Expect user to be of type User
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-1 flex-col lg:ml-72.5">
        <Header setOpenSignOutModal={setOpenSignOutModal}  user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="mx-auto bg-gray-3 max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
            {openSignOutModal && <SignOutModal setOpenSignOutModal={setOpenSignOutModal}/>}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
