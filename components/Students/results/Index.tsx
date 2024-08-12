"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ChartOne from "@/components/Shared/Charts/ChartOne";
import ChartTwo from "@/components/Shared/Charts/ChartTwo";
import CardDataStats from "@/components/Shared/CardDataStats";
import ChatCard from "@/components/Shared/Chat/ChatCard";
import TableOne from "@/components/Shared/Tables/TableOne";
import DataLoader from "@/components/Shared/Loaders/Loader";
import NoExaminationsFound from "@/components/Shared/Errors/NoExaminationsUploaded";
import StudentGradesTable from "./GradesTable";
import { User } from "@/types/user";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MapOne = dynamic(() => import("@/components/Shared/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Shared/Charts/ChartThree"), {
  ssr: false,
});

interface ExaminationResultsProps {
  user: User;
}

interface Grade {
  subject_name: string;
  subject_code: string;
  letter_grade: string;
  number_grade: number;
  grade_comments: string;
}

interface ResultData {
  status: string;
  message: string;
  average: number;
}

const ExaminationResults: React.FC<ExaminationResultsProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasExaminationResults, setHasExaminationResults] = useState<boolean>(true);
  const [hasExaminationResultsStatus, setHasExaminationResultsStatus] = useState<boolean>(true);
  const [examinationResultData, setExaminationResultData] = useState<ResultData | null>(null);

  const endPoint = "students";
  const gradesEndpoint = "grades";
  let displayName = "User";
  let studentId = 0;

  if ("student" in user) {
    displayName = `${user.student.first_name} ${user.student.last_name}`;
    studentId = user.student.id;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getStudentResults', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId,
            endPoint,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.grades)) {
            const grades: Grade[] = data.grades.map((subject: any) => ({
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
        } else {
          setHasExaminationResults(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch examination results.");
        setHasExaminationResults(false);
      } finally {
        setLoading(false);
      }
    };

    const fetchResults = async () => {
      try {
        const response = await fetch('/api/getResultsStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId,
            gradesEndpoint,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data !== undefined) {
            const resultData: ResultData = {
              status: data.status || 'N/A',
              message: data.message || 'No message available',
              average: data.average || 0,
            };
            setExaminationResultData(resultData);
            setHasExaminationResultsStatus(true);
          } else {
            setHasExaminationResultsStatus(false);
          }
        } else {
          setHasExaminationResultsStatus(false);
        }
      } catch (error) {
        console.error("Error fetching results status:", error);
        setError("Failed to fetch examination status.");
        setHasExaminationResultsStatus(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchResults();
  }, [endPoint, gradesEndpoint, studentId]);

  if (loading) return <DataLoader />;
  if (error) return <div>Error: {error}</div>;
  if (!hasExaminationResults || !hasExaminationResultsStatus) return <NoExaminationsFound />;

  // Determine card background color based on status
  const cardBackgroundColor = examinationResultData?.status === 'Pass' ? 'bg-green-200' : 'bg-red-200';

  // Determine the icon based on status
  const resultIcon = examinationResultData?.status === 'Pass' ? 
    <FaCheckCircle className="text-green-500" /> : 
    <FaTimesCircle className="text-red" />;

  return (
    <>
      <StudentGradesTable studentId={studentId} />
      {examinationResultData && (
        <div className="p-4 mt-5 mb-6 rounded-lg shadow-md">
          <h3 className="text-xl mb-2 flex items-center space-x-2">
          Status:
                    <span className={`${cardBackgroundColor} px-4 rounded-lg`}>{examinationResultData.status}</span>
            {resultIcon}
          </h3>
          <p className="text-lg mb-2">Remarks: {examinationResultData.message}</p>
          <p className="text-lg">Average Score: {examinationResultData.average.toFixed(2)}</p>
        </div>
      )}
 
    </>
  );
};

export default ExaminationResults;
