import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DataLoader from '@/components/Shared/Loaders/Loader';
import NoAssessmentsFound from '@/components/Shared/Errors/NoAssessmentsUploaded';
import { formatDateToWords } from '@/utils/DateFormat'; // Ensure this utility function is correctly implemented
import { getButtonColor, getCardColor, getIcon, getTextColor } from '@/helpers/SubjectDisplayHelper';
import { User } from "../../../types/user";
import Link from "next/link";

interface AssessmentData {
  assessment_id: number;
  subject_id: number;
  subject_name: string;
  subject_code: string;
  score: number;
  total_marks: number;
  grade_value: number;
  comments: string;
  date: string;
  student_name: string;
  tutor_name: string;
  icon: React.ReactNode;
  cardColor: string;
  textColor: string;
  buttonColor: string;
}

interface AssessmentSummaryProps {
  user: User;
  assessment_id: number;
}

const ShowAssessment: React.FC<AssessmentSummaryProps> = ({ user, assessment_id }) => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAssessments, setHasAssessments] = useState<boolean>(true);

  const endPoint = 'assessments/show';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/ShowData`, {
          id: assessment_id,
          endPoint: endPoint,
        });

        if (Array.isArray(response.data.assessment)) {
          const assessments = response.data.assessment.map((assessment: any) => ({
            assessment_id: assessment.id,
            subject_id: assessment.subject_id,
            subject_name: assessment.subject_name,
            subject_code: assessment.subject_code,
            score: assessment.score,
            total_marks: assessment.total_marks,
            grade_value: assessment.grade_value,
            comments: assessment.comments,
            date: assessment.date,
            student_name: `${assessment.student_first_name} ${assessment.student_last_name}`,
            tutor_name: `${assessment.tutor_first_name} ${assessment.tutor_last_name}`,
            icon: getIcon(assessment.subject_name),
            cardColor: getCardColor(assessment.subject_name),
            textColor: getTextColor(assessment.subject_name),
            buttonColor: getButtonColor(assessment.subject_name),
          }));
          setAssessmentData(assessments);
          setHasAssessments(assessments.length > 0);
        } else {
          setHasAssessments(false);
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        setHasAssessments(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint, assessment_id]);

  if (loading) return <div><DataLoader /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!hasAssessments) return <NoAssessmentsFound />;

  // Use the color of the first assessment or a default color
  const dynamicBgColor = assessmentData.length > 0 ? assessmentData[0].cardColor : 'bg-primary';
  const dynamicTextColor = assessmentData.length > 0 ? assessmentData[0].textColor : 'text-white';

  const dynamicButtonColor = assessmentData.length > 0 ? assessmentData[0].buttonColor : 'bg-white';

  const dynamicIcon = assessmentData.length > 0 ? assessmentData[0].icon : 'bg-white';


  return (
    <main className="sm:grid place-content-center min-h-screen">
      <div className="max-w-2xl sm:shadow-2xl sm:shadow-light-lavender/80 sm:mx-4 sm:grid sm:grid-cols-2 sm:rounded-3xl">
        
        <div className={`grid content-start items-center justify-center text-center gap-4 text-light-lavender result py-8 px-16 rounded-b-3xl sm:rounded-3xl ${dynamicBgColor}`}>
          {assessmentData.map((assessment) => (
            <React.Fragment key={assessment.assessment_id}>
              <h1 className={`text-xl ${dynamicTextColor}`}>Your Result</h1>

              <p className="w-32 mx-auto aspect-square bg-gradient-to-b from-violet-blue to-persian-blue rounded-full grid place-content-center">
                <span className={`text-5xl  font-bold ${dynamicTextColor}`}>{assessment.score}</span> <span className={`opacity-70 ${dynamicTextColor}`}>of {assessment.total_marks}</span>
              </p>

              <h2 className={`text-2xl ${dynamicTextColor} font-semibold`}>
                {assessment.grade_value >= 0.7 ? 'Excellent' : assessment.grade_value >= 0.5 ? 'Good' : 'Needs Improvement'}
              </h2>
              <p className={`${dynamicTextColor}`}>You scored higher than 65% of the people who have taken these tests.</p>
            </React.Fragment>
          ))}
        </div>

        <div className="p-8 grid content-start gap-6">
          <h1 className={`text-xl ${dynamicTextColor} font-bold`}>Assessment Summary</h1>

          <div className="grid gap-4">
            {assessmentData.map((assessment) => (
              
              <div key={assessment.subject_id}>
                <div className="flex gap-2 justify-center items-center">
                  {assessment.icon}
                  <p className={`${assessment.textColor} font-bold`}>{assessment.subject_name}</p>
                </div>
                <div className={`rounded-lg mt-5 p-2 ${assessment.cardColor} flex justify-between`}>
                  
                  <div className={`text-sm ${assessment.textColor} font-bold`}>
                    <p>Score:</p>
                  </div>
                  <p className={`${assessment.textColor} font-bold`}>
                    {assessment.score} <span className={`${assessment.textColor} font-semibold`}>/ {assessment.total_marks}</span>
                  </p>
                </div>
                <div className={`rounded-lg p-2 ${assessment.cardColor} mt-4 flex justify-between`}>
                  <p className={`text-sm ${assessment.textColor} font-bold`}>Assessment Date:</p>
                  <p className={`${assessment.textColor} font-semibold`}>{formatDateToWords(assessment.date)}</p>
                </div>
                <div className={`rounded-lg p-2 ${assessment.cardColor} mt-4 flex justify-between`}>
                    <p className={`text-sm ${assessment.textColor} font-bold`}>Comments:</p>
                  <p className={`${assessment.textColor} font-semibold`}>{assessment.comments}</p>
                </div>
                <div className={`rounded-lg p-2 ${assessment.cardColor} mt-4 flex justify-between`}>
                   <p className={`text-sm ${assessment.textColor} font-bold`}>Teacher:</p>
                  <p className={`${assessment.textColor} font-semibold`}>{assessment.tutor_name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
          <Link href='/Student/assessments/Index'>
            <button className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm ${dynamicTextColor} transition duration-300 ease-in-out bg-white border border-${dynamicBgColor} rounded-lg gap-x-2 sm:w-auto  hover:${dynamicButtonColor} dark:text-gray-200 dark:border-gray-700`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
                <span>Go back</span>
            </button>
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}

export default ShowAssessment;
