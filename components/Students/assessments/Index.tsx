'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Loader from '@/components/Shared/Loaders/Loader';
import { FaCheckCircle, FaEye, FaTimesCircle } from 'react-icons/fa';
import NoEndOfTermExaminations from '@/components/Shared/Errors/NoEndOfTermExaminations';
import Link from 'next/link';
import { User } from '@/types/user';

// Updated interfaces to reflect the structure of the assessment data from the API
interface AssessmentData {
  subject_name: string;
  subject_code: string;
  score: number;
  max_score: number;
  comments: string;
  assessment_id:number;
  assessment_grade_value:number;
  term_name: string;
}

interface TermData {
  id: number;
  name: string;
}

interface ClassData {
  id: number;
  name: string;
}

interface ResultData {
  status: string;
  message: string;
  average: number;
}

interface StudentProps {
  user: User
}

const AssessmentsIndex: React.FC<StudentProps> = ({ user  }) => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData[]>([]);
  const [filteredData, setFilteredData] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [terms, setTerms] = useState<TermData[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [hasAssessmentResults, setHasAssessmentResults] = useState<boolean>(true);
  const [assessmentResultData, setAssessmentResultData] = useState<ResultData | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [id, setId]  = useState<number>(0);
  const endPoint = 'assessments';

  let displayName = "User";
  let studentId = 0;
  let class_id =0 ;
  let registrationNumber = '';

  if ("student" in user) {
    displayName = `${user.student.first_name} ${user.student.last_name}`;
    studentId = user.student.id;
    class_id =user.student.class_id;
    registrationNumber = user.student.registration_number;
  }

  // Define table columns for the assessment data
  const columns = [
    { name: 'Subject', selector: (row: AssessmentData) => row.subject_name },
    { name: 'Code', selector: (row: AssessmentData) => row.subject_code },
    { name: 'Score', selector: (row: AssessmentData) => `${row.score} / ${row.max_score}` },
    { name: 'Term', selector: (row: AssessmentData) => row.term_name },
    { name: 'Comments', selector: (row: AssessmentData) => row.comments,  },
    {
        name: 'Action',
        
        cell: (row: AssessmentData) => (
          <div className="flex justify-around">
            <Link href={`/Student/assessments/subject/${row.assessment_id}`}>
              <button
                onClick={() => setId(row.assessment_id)}
                className="mr-4 rounded bg-blue-500 px-2 py-2 text-white transition duration-300 hover:bg-blue-400"
              >
                <FaEye className="mr-2 inline-block" /> View
              </button>
            </Link>
          </div>
        ),
      }
      
  ];

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '14px',
        backgroundColor: '#f3f4f6',
        color: 'black',
      },
    },
  };

  // Fetch terms for selection
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.post('/api/GetData', { endPoint: 'terms' });
        if (response.status === 200) {
          setTerms(response.data.terms);
          if (response.data.terms.length > 0) {
            setSelectedTermId(response.data.terms[0].id);
          }
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
      }
    };

    fetchTerms();
  }, []);

  // Fetch classes for selection
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.post('/api/GetData', { endPoint: 'classroom' });
        if (response.status === 200) {
          setClasses(response.data.classes);
          if (response.data.classes.length > 0) {
            setSelectedClassId(response.data.classes[0].id);
          }
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
      }
    };

    fetchClasses();
  }, []);

  // Fetch assessment data based on selected term and class
  useEffect(() => {
    const fetchAssessments = async () => {
      if (selectedTermId === null || selectedClassId === null) return;

      setLoading(true);
      try {
        const response = await axios.post('/api/getStudentAssessments', {
         endPoint: endPoint,
         studentId: studentId,
         data:{ 
          term_id: selectedTermId,
          class_id: selectedClassId,
        }
        });

        if (response.status === 200) {
          if (Array.isArray(response.data.assessments)) {
            const assessments = response.data.assessments.map((assessment: any) => ({
              subject_name: assessment.subject_name,
              subject_code: assessment.subject_code,
              score: assessment.assessment_score,
              max_score: assessment.assessment_marks,
              comments: assessment.assessment_comments,
              term_name: assessment.term_name,
              assessment_id:assessment.assessment_id,
              grade_value:assessment.assessment_grade_value
            }));

            const resultData: ResultData = {
              status: response.data.status || 'N/A',
              message: response.data.message || 'No message available',
              average: response.data.average || 0,
            };

            setAssessmentData(assessments);
            setHasAssessmentResults(assessments.length > 0);
            setAssessmentResultData(resultData);
          } else {
            setAssessmentData([]);
            setHasAssessmentResults(false);
          }
        } else if (response.status === 404) {
          setHasAssessmentResults(false);
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        setAssessmentData([]);
        setHasAssessmentResults(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [studentId, selectedTermId, selectedClassId]);

  // Filter assessments based on search input
  useEffect(() => {
    setFilteredData(
      assessmentData.filter((data) =>
        data.subject_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, assessmentData]);

  if (loading) return <Loader />;

  if (error) {
    if (error === 'Not Found') {
      if (!hasAssessmentResults) return <NoEndOfTermExaminations />;
    } else {
      return <div>Error: {error}</div>;
    }
  }

  const cardBackgroundColor =
    assessmentResultData?.status === 'Pass' ? 'bg-green-200' : 'bg-red-200';
  const resultIcon =
    assessmentResultData?.status === 'Pass' ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaTimesCircle className="text-red" />
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
    >
        <div className="min-h-screen">

      <div className="container px-4 mx-auto mt-20">
        <div className="bg-blue-400 flex justify-center rounded-sm p-4">
          <h2 className="text-2xl  font-bold text-white mb-4">Mid Term Examinations Table</h2>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-4">
            <div className="flex justify-between">
              <label className="text-primary text-sm font-bold mb-2" htmlFor="registrationNumber">
                Registration Number
              </label>

              <label className="text-primary text-sm font-bold mb-2" htmlFor="term">
                Select Term
              </label>
            </div>

            <div className="mb-4 flex justify-between">
              <input
                type="text"
                id="registrationNumber"
                className="w-full md:w-1/2 lg:w-1/5 mb-5 rounded-md border bg-gray-100 py-2 px-4 text-black focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                value={registrationNumber}
                readOnly
              />

              <select
                id="classroom"
                className="w-full md:w-1/2 lg:w-1/6 mb-5 rounded-md border border-gray-4 bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                value={selectedClassId ?? ''}
                onChange={(e) => setSelectedClassId(Number(e.target.value))}
              >
                {classes.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>

              <select
                id="term"
                className="w-full md:w-1/2 lg:w-1/6 mb-5 rounded-md border border-gray-4 bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                value={selectedTermId ?? ''}
                onChange={(e) => setSelectedTermId(Number(e.target.value))}
              >
                {terms.map((term) => (
                  <option key={term.id} value={term.id}>
                    {term.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              className="w-full md:w-1/2 lg:w-1/3 mb-5 rounded-md border border-gray-400 py-2 px-4 text-black focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Search by Subject"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="rounded-lg shadow-md overflow-x-auto">
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                responsive
                customStyles={tableHeaderStyle}
                noDataComponent={
                  !loading && filteredData.length === 0 ? (
                    <div className="text-red-600">No assessments found</div>
                  ) : undefined
                }
              />
            </div>

            
          </div>
        </div>
      </div>
      </div>

    </motion.div>
  );
};

export default AssessmentsIndex;
