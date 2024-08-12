"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Loader from '@/components/Shared/Loaders/Loader';
import NoExaminationsFound from '@/components/Shared/Errors/NoExaminationsUploaded';

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
  const [filter, setFilter] = useState<ExaminationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [hasExaminationResults, setHasExaminationResults] = useState<boolean>(true);
  const endPoint = "students";
  const columns = [
    {
      name: 'Subject',
      selector: (row: ExaminationData) => row.subject_name,
    },
    {
      name: 'Code',
      selector: (row: ExaminationData) => row.subject_code,
    },
    {
      name: 'Number Grade',
      selector: (row: ExaminationData) => row.number_grade,
    },
    {
      name: 'Letter Grade',
      selector: (row: ExaminationData) => row.letter_grade,
    },
    {
      name: 'Comments',
      selector: (row: ExaminationData) => row.grade_comments,
      grow: 3
    },
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
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/getStudentResults', {
          studentId: studentId,
          endPoint:endPoint
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
        setError(error.response?.statusText || error.message);
        setHasExaminationResults(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  useEffect(() => {
    setFilter(
      examinationData.filter((data) =>
        data.subject_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, examinationData]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!hasExaminationResults) return <NoExaminationsFound />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.6 }}
    >
      <div className="container px-4 mx-auto mt-20">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Examination Results</h2>
        <div className="bg-white shadow rounded-lg">
          <div className="p-4">
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
                    className="w-full md:w-1/2 lg:w-1/3 mb-5 rounded-md border bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
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
    </motion.div>
  );
};

export default StudentGradesTable;
