import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataLoader from '@/components/Shared/Loaders/Loader';
import { User } from '@/types/user';
import { FaGraduationCap } from 'react-icons/fa'; // Import graduation icon
import NoEndOfYearResults from '@/components/Shared/Errors/NoEndOfYearResults';

interface TermAverage {
  term: string;
  average: number;
}

interface ResultsProps {
  user: User;
}

const OverallResults: React.FC<ResultsProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [overallAverage, setOverallAverage] = useState<number | null>(null);
  const [termAverages, setTermAverages] = useState<TermAverage[]>([]);

  const endPoint = 'grades';
  let studentId = 0;
  let classId = 0;
  let registrationNumber = '';

  if ("student" in user) {
    studentId = user.student.id;
    classId = user.student.class_id;
    registrationNumber = user.student.registration_number;
  }
  console.log(
    "Class id:" + classId + "student id:" + studentId
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/getOverallResults', {
          studentId,
          endPoint,
          classId,
        });

        console.log("Response data:", response.data);

        // Ensure that the response has the expected structure
        const { status, message, overall_average, term_averages } = response.data || {};

        // Set state based on response
        setStatus(status || 'No status available');
        setMessage(message || 'No message provided');
        setOverallAverage(overall_average || 0);
        setTermAverages(term_averages || []);
      } catch (error: any) {
        console.error('Error fetching overall results:', error);
        setError(error.response?.statusText || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [classId, endPoint, studentId]);

  if (loading) return <div><DataLoader /></div>;
  if (error) return <div>Error: {error}</div>;

  // Render NoExaminationsUploaded if no term averages are found
  if (termAverages.length === 0) {
    return <NoEndOfYearResults />;
  }

  const getStatusClasses = (status: string | null) => {
    if (status === 'Withdraw') return 'bg-red';
    return 'bg-green-500';
  };

  return (
    <main className="sm:grid place-content-center min-h-screen">
      <div className="max-w-2xl sm:shadow-2xl sm:shadow-light-lavender/80 sm:mx-4 sm:grid sm:grid-cols-2 sm:rounded-3xl">
        <div className={`grid content-start items-center justify-center text-center gap-4 text-light-lavender result py-8 px-16 rounded-b-3xl sm:rounded-3xl ${getStatusClasses(status)}`}>
          <h1 className="text-xl text-white">End Of Year Results</h1>

          {status && (
            <div className="mb-4">
              <p className="text-lg font-semibold text-white">{status}</p>
              <p className="text-sm text-white">{message}</p>
            </div>
          )}

          {status === "Graduated" && (
            <div className="flex justify-center items-center mb-4">
              <FaGraduationCap className="text-white text-3xl" />
              <span className="ml-2 text-lg font-semibold text-white">Graduated</span>
            </div>
          )}

          {overallAverage !== null && (
            <div className="w-32 mx-auto aspect-square bg-gradient-to-b from-violet-blue to-persian-blue rounded-full grid place-content-center">
              <span className="text-5xl font-bold text-white">{overallAverage.toFixed(2)}</span>
              <span className="opacity-70 text-white">Overall Average</span>
            </div>
          )}
        </div>

        <div className="block p-10 w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
          <h2 className="text-2xl font-semibold mt-6">Term Averages</h2>
          <ul>
            {termAverages.map((termAverage, index) => (
              <li key={index} className="text-lg p-3">
                {termAverage.term}: {termAverage.average.toFixed(2)}
              </li>
            ))}
          </ul>
          <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-primary transition duration-300 ease-in-out bg-white border border-primary rounded-lg gap-x-2 sm:w-auto hover:bg-primary hover:text-white dark:text-gray-200 dark:border-gray-700">
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
        </div>
      </div>
    </main>
  );
};

export default OverallResults;
