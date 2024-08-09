'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv, FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import Loader from '@/components/Shared/Loader';

// Update the Result interface
interface Result {
  grade_id: number;
  score: number;
  marks: number;
  grade_value: number;
  grade_comments: string;
  graded_at: string;
  student_first_name: string;
  student_last_name: string;
  subject_name: string;
  subject_code: string;
  tutor_first_name: string;
  tutor_last_name: string;
}

interface AssessmentProps {
    subject_id: number;
}

const ViewExamResults: React.FC<AssessmentProps> = ({ subject_id }) => {
  const [search, setSearch] = useState('');
  const [assessmentData, setAssessmentData] = useState<Result[]>([]);
  const [filter, setFilter] = useState<Result[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'grades';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Update columns to reflect the new field names
  const columns = [
    {
      name: 'Grade ID',
      selector: (row: Result) => 'Grade-' + row.grade_id,
    },
    {
      name: 'Student',
      selector: (row: Result) => `${row.student_first_name} ${row.student_last_name}`,
    },
    {
      name: 'Subject',
      selector: (row: Result) => row.subject_name,
    },
    {
      name: 'Score',
      selector: (row: Result) => row.score,
    },
    {
      name: 'Marks',
      selector: (row: Result) => row.marks,
    },
    {
      name: 'Grade Value (%)',
      selector: (row: Result) => row.grade_value,
      grow:2
    },
    {
      name: 'Comments',
      selector: (row: Result) => row.grade_comments,
      grow:3
    },
    {
      name: 'Date',
      selector: (row: Result) => row.graded_at,
    },
    // {
    //   name: 'Tutor',
    //   selector: (row: Result) => `${row.tutor_first_name} ${row.tutor_last_name}`,
    // },
    {
      name: 'Action',
      cell: (row: Result) => (
        <div className="flex justify-around">
          <Link href={`/Admin/results/edit//${row.grade_id}`}>
            <button
              onClick={() => {
                setId(row.grade_id);
                console.log('Edit Grade ID:', row.grade_id);
              }}
              className="mr-4 rounded bg-blue-400 px-2 py-2 text-white transition duration-300 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-yellow-300"
            >
              <FaEdit className="mr-2 inline-block" /> Edit
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

  const handleClick = () => {
    // Handle button click
  };

  const handleBackClick = () => {
    // Handle back button click, e.g., navigating to the previous page
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/GetAssessments`, { endPoint: endPoint, subjectId: subject_id });
        console.log('Response data is:', JSON.stringify(response.data.grades));
        setAssessmentData(response.data.grades); // Update to match the response structure
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject_id]);

  useEffect(() => {
    // Filter assessments based on the search term
    const result = assessmentData.filter((assessment) => {
      return assessment.student_first_name.toLowerCase().includes(search.toLowerCase()) || 
             assessment.student_last_name.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [search, assessmentData]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.log(error);
  }

  return (
    <>
      <div className='h-screen'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.6 }}
      >
        <div className="mb-8 mt-20 flex flex-col gap-12">
          <div className="bg-white shadow rounded-lg">
            <div className="flex justify-between items-center bg-gray-100 p-6 rounded-t-lg">
              <div className="flex items-center">
                <button
                  onClick={handleBackClick}
                  className="mr-4 rounded bg-gray-300 px-4 py-2 text-sm font-medium text-black transition duration-300 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                >
                  <Link href={`/Tutors/results/selection/${subject_id}`}>
                    <div className="flex bg-mainColor text-white py-2 px-4 rounded-sm items-center justify-center">
                      <FaArrowLeft className="mr-2" />
                      Back
                    </div>
                  </Link>
                </button>
                <h2 className="text-2xl font-bold text-blue-600">Examination Results</h2>
              </div>
              <button
                onClick={handleClick}
                className="rounded bg-mainColor px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300"
              >
                <div className="flex items-center justify-center">
                  <FaFileCsv className="mr-2" />
                  Export CSV
                </div>
              </button>
            </div>
            <div className="overflow-x-auto p-4">
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
                    className="w-25 mb-5 rounded-md border bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                }
                subHeaderAlign={"left" as any}
              />
            </div>
          </div>
        </div>
      </motion.div>


      </div>
    </>
  );
};

export default ViewExamResults;
