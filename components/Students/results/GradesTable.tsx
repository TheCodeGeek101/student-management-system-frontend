import NoExaminationsFound from '@/components/Shared/Errors/NoExaminationsUploaded';
import DataLoader from '@/components/Shared/Loaders/Loader';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ExaminationData {
  subject_name: string;
  subject_code: string;
  letter_grade: string;
  number_grade: number;
  grade_comments: string;
}

interface StudentProps {
  studentId: number;
}

const StudentGradesTable: React.FC<StudentProps> = ({ studentId }) => {
  const [examinationData, setExaminationData] = useState<ExaminationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasExaminationResults, setHasExaminationResults] = useState<boolean>(true);
  const endPoint = 'students';

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
          setExaminationData(grades);
          setHasExaminationResults(grades.length > 0);
        } else {
          setHasExaminationResults(false);
        }
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.response?.statusText || error.message);
        setHasExaminationResults(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint, studentId]);

  if (loading) return <DataLoader/>;
  if (error) return <div>Error: {error}</div>;
  if (!hasExaminationResults) return <NoExaminationsFound/>;

  return (
    <section className="container px-4 mx-auto">
      <h2 className="text-lg font-medium text-gray-800">Results</h2>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-x-auto border border-gray-50 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Subject
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Code
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Number Grade
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Letter Grade
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Comments
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {examinationData.map((subject) => (
                    <tr key={subject.subject_code}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">{subject.subject_name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200">{subject.subject_code}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200">{subject.number_grade}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200">{subject.letter_grade}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200">{subject.grade_comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentGradesTable;
