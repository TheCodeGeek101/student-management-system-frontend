"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "../Shared/Sidebar";
import Header from "../Shared/Header";
import { User } from '../../types/user'; // Import User type from the correct file
import SignOutModal from "../Shared/Header/SignOutModal";
import StudentSidebar from "../Shared/Sidebar/StudentSidebar";
import TeacherSidebar from "../Shared/Sidebar/TeacherSidebar";
import GetLoggedInUserHelper from "@/helpers/GetLoggedInUserHelper";
import Loader from "../Shared/Loader";

interface DefaultLayoutProps {
  children: ReactNode;
  user: User; // Expect user to be of type User
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const loggedInUser = GetLoggedInUserHelper();

  // Show loader if loggedInUser is undefined (still fetching)
  if (!loggedInUser) {
    return <Loader />;
  }

  // Extract role from user object
  const role = loggedInUser.role;
  console.log("User role is: " + role);

  const renderSidebar = () => {
    switch (role) {
      case "admin":
        return <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
      case "teacher":
        return <TeacherSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
      case "student":
        return <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
      default:
        return <p className="text-center">No menu available for this role.</p>;
    }
  };

  return (
    <div className="flex">
      {renderSidebar()}
      <div className="relative flex flex-1 flex-col lg:ml-72.5">
        <Header setOpenSignOutModal={setOpenSignOutModal} user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="mx-auto bg-gray-3 max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
          {openSignOutModal && <SignOutModal setOpenSignOutModal={setOpenSignOutModal} />}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
