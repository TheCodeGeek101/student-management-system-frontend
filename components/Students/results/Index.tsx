"use client";
import React, { useEffect, useState } from "react";
import StudentGradesTable from "./GradesTable";
import { User } from "@/types/user";


interface ExaminationResultsProps {
  user: User;
}


const ExaminationResults: React.FC<ExaminationResultsProps> = ({ user }) => {
  let displayName = "User";
  let studentId = 0;
  let registrationNumber = '';

  if ("student" in user) {
    displayName = `${user.student.first_name} ${user.student.last_name}`;
    studentId = user.student.id;
    registrationNumber = user.student.registration_number;
    console.log("bwana reg number:" + registrationNumber);
  }

 

  

  return (
    <>
      <StudentGradesTable studentId={studentId} registrationNumber={registrationNumber} />
    </>
  );
};

export default ExaminationResults;
