'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Loader from '@/components/Shared/Loaders/Loader';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import NoEndOfTermExaminations from '@/components/Shared/Errors/NoEndOfTermExaminations';

interface ExaminationData {
  subject_name: string;
  subject_code: string;
  letter_grade: string;
  number_grade: number;
  grade_comments: string;
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
  studentId: number;
  registrationNumber: string;
}

const StudentGradesTable: React.FC<StudentProps> = ({ studentId, registrationNumber }) => {
  const [examinationData, setExaminationData] = useState<ExaminationData[]>([]);
  const [filter, setFilter] = useState<ExaminationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [terms, setTerms] = useState<TermData[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [hasExaminationResults, setHasExaminationResults] = useState<boolean>(true);
  const [examinationResultData, setExaminationResultData] = useState<ResultData | null>(null);
  const endPoint = 'students';

 const [classes, setClasses ] = useState<ClassData[]>([]);
 
  const columns = [
    { name: 'Subject', selector: (row: ExaminationData) => row.subject_name },
    { name: 'Code', selector: (row: ExaminationData) => row.subject_code },
    { name: 'Number Grade', selector: (row: ExaminationData) => row.number_grade },
    { name: 'Letter Grade', selector: (row: ExaminationData) => row.letter_grade },
    { name: 'Term', selector: (row: ExaminationData) => row.term_name },
    { name: 'Comments', selector: (row: ExaminationData) => row.grade_comments, grow: 3 },
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
      } catch (error:any) {
        setError(error.response?.statusText || error.message);
      }
    };


    fetchTerms();
  }, []);

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
      } catch (error:any) {
        setError(error.response?.statusText || error.message);
      }
    };


    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTermId === null || selectedClassId === null) return;

      setLoading(true);
      try {
        const response = await axios.post('/api/getStudentResults', {
          endPoint: endPoint,
          studentId: studentId,
          termId: selectedTermId,
          classId:selectedClassId
        });

        if (response.status === 200) {
          if (Array.isArray(response.data.grades)) {
            const grades = response.data.grades.map((subject: any) => ({
              subject_name: subject.subject_name,
              subject_code: subject.subject_code,
              letter_grade: subject.letter_grade,
              number_grade: subject.number_grade,
              grade_comments: subject.grade_comments,
              term_name: subject.term_name,
            }));

            const resultData: ResultData = {
              status: response.data.status || 'N/A',
              message: response.data.message || 'No message available',
              average: response.data.average || 0,
            };

            setExaminationData(grades);
            setHasExaminationResults(grades.length > 0);
            setExaminationResultData(resultData);
          } else {
            setExaminationData([]);
            setHasExaminationResults(false);
          }
        } else if (response.status === 404) {
          setHasExaminationResults(false);
        }
      } catch (error:any) {
        setError(error.response?.statusText || error.message);
        setExaminationData([]);
        setHasExaminationResults(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, selectedTermId, selectedClassId]);

  useEffect(() => {
    setFilter(
      examinationData.filter((data) =>
        data.subject_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, examinationData]);

  if (loading) return <Loader />;
  
  if (error) {
    if (error === 'Not Found') {
      if (!hasExaminationResults) return <NoEndOfTermExaminations />;
    } else {
      return <div>Error: {error}</div>;
    }
  }

  const cardBackgroundColor = examinationResultData?.status === 'Pass' ? 'bg-green-200' : 'bg-red-200';
  const resultIcon = examinationResultData?.status === 'Pass' ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red" />;
  console.log("reg number" + registrationNumber);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
    >
      <div className="container px-4 mx-auto mt-20">
        <div className="bg-blue-400 rounded-sm p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Examinations Table</h2>

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
            <div className="mb-4  flex justify-between">
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
            <div className="overflow-x-auto">
              <DataTable
                customStyles={tableHeaderStyle}
                columns={columns}
                data={filter}
                pagination
                selectableRows
                selectableRowsHighlight
                fixedHeader
                highlightOnHover
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    className="w-full flex justify-start md:w-1/2 lg:w-1/6 mb-5 rounded-md border bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Search by subject..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                }
                subHeaderAlign={"left" as any}
              />
            </div>
          </div>
        </div>
      </div>
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
    </motion.div>
  );
};

export default StudentGradesTable;
