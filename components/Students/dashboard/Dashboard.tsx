"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ChartOne from "@/components/Shared/Charts/ChartOne";
import ChartTwo from "@/components/Shared/Charts/ChartTwo";
import CardDataStats from "@/components/Shared/CardDataStats";
import ChatCard from "@/components/Shared/Chat/ChatCard";
import TableOne from "@/components/Shared/Tables/TableOne";
import axios from "axios";
import TutorChart from "@/components/Shared/Charts/TutorChart";
import { User } from "@/types/user";
import StudentChart from "@/components/Shared/Charts/StudentChart";


interface DashboardProps {
  user: User;
}

const MapOne = dynamic(() => import("@/components/Shared/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Shared/Charts/ChartThree"), {
  ssr: false,
});




const StudentDashboard: React.FC<DashboardProps> = ({user}) => {
    let studentId = 0;
    let classId = 0;
    let registrationNumber = '';
  
    if ("student" in user) {
      studentId = user.student.id;
      classId = user.student.class_id;
      registrationNumber = user.student.registration_number;
    }

  return (
    <>
     
      <div className="mt-4">
      {/* <TutorChart teacherId={teacherId} /> */}

      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <StudentChart studentId={studentId}/>
        <ChartTwo />
           <div className="col-span-12 xl:col-span-8">
          {/* <TableOne /> */}
        </div>
        {/* <ChatCard /> */}
      </div>
    </>
  );
};

export default StudentDashboard;
