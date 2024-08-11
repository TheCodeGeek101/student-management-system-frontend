"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ChartOne from "@/components/Shared/Charts/ChartOne";
import ChartTwo from "@/components/Shared/Charts/ChartTwo";
import CardDataStats from "@/components/Shared/CardDataStats";
import ChatCard from "@/components/Shared/Chat/ChatCard";
import TableOne from "@/components/Shared/Tables/TableOne";
import { User } from "@/types/user";
import StudentGradesTable from "./GradesTable";
import axios from "axios";
import DataLoader from "@/components/Shared/Loaders/Loader";
import NoExaminationsFound from "@/components/Shared/Errors/NoExaminationsUploaded";

const MapOne = dynamic(() => import("@/components/Shared/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Shared/Charts/ChartThree"), {
  ssr: false,
});

interface ExaminationResultsProps {
    user: User
}

const ExaminationResults: React.FC<ExaminationResultsProps> = ({user}) => {
    const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasExaminationResults, setHasExaminationResults] = useState<boolean>(true);
    const endPoint = "students";
    let displayName = 'User';
  let studentId = 0;

  if ('student' in user) {
    displayName = `${user.student.first_name} ${user.student.last_name}`;
    studentId = user.student.id;
  }
  useEffect(() => {
    const fetchData = async () => {
       try {
        const response = await axios.post('/api/getStudentResults', {
          studentId: studentId,
          endPoint: endPoint,
        });

        if (response.status === 200 && Array.isArray(response.data.grades)) {
            const grades = response.data.grades.map((subject: any) => ({
            subject_name: subject.subject_name,
            subject_code: subject.subject_code,
            letter_grade: subject.letter_grade,
            number_grade: subject.number_grade,
            grade_comments: subject.grade_comments,
          }));
          setHasExaminationResults(grades.length > 0);
        } else {
          setHasExaminationResults(false);
        }
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setHasExaminationResults(false);
      } finally {
        setLoading(false);
      }

    }
    fetchData();
  },[endPoint,studentId]);
   if (loading) return <DataLoader/>;
  if (error) return <div>Error: {error}</div>;
//   if (!hasExaminationResults) return <NoExaminationsFound/>;

  return (
    !hasExaminationResults ? 
    <NoExaminationsFound/>
    :
    <>
        <StudentGradesTable studentId={studentId}/>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
       
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ExaminationResults;
