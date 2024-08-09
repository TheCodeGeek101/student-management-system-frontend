"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv, FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import Loader from '@/components/Shared/Loader';

interface Assessment {
  assessment_id: number;
  assessment_score: number;
  assessment_marks: number;
  assessment_grade_value: number;
  assessment_comments: string;
  assessment_date: string;
  student_first_name: string;
  student_last_name: string;
  subject_name: string;
  subject_code: string;
  tutor_first_name: string;
  tutor_last_name: string;
}

interface AssessmentProps {
    subject_id:number;
}

const ViewAssessments: React.FC<AssessmentProps> = ({subject_id}) => {
  const [search, setSearch] = useState('');
  const [assessmentData, setAssessmentData] = useState<Assessment[]>([]);
  const [filter, setFilter] = useState<Assessment[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'assessments';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    {
      name: 'Assessment ID',
      selector: (row: Assessment) => 'Assm-' + row.assessment_id,
    },
    {
      name: 'Student',
      selector: (row: Assessment) => `${row.student_first_name} ${row.student_last_name}`,
    },
    {
      name: 'Subject',
      selector: (row: Assessment) => row.subject_name,
    },
    {
      name: 'Score',
      selector: (row: Assessment) => row.assessment_score,
    },
    {
      name: 'Marks',
      selector: (row: Assessment) => row.assessment_marks,
    },
    {
      name: 'Grade Value',
      selector: (row: Assessment) => row.assessment_grade_value,
    },
    {
      name: 'Comments',
      selector: (row: Assessment) => row.assessment_comments,
    },
    {
      name: 'Date',
      selector: (row: Assessment) => row.assessment_date,
    },
    {
      name: 'Tutor',
      selector: (row: Assessment) => `${row.tutor_first_name} ${row.tutor_last_name}`,
    },
    {
      name: 'Action',
      cell: (row: Assessment) => (
        <div className="flex justify-around">
          <Link href={`/Admin/assessments/edit/assessment/${row.assessment_id}`}>
            <button
              onClick={() => {
                setId(row.assessment_id);
                console.log('Edit Assessment ID:', row.assessment_id);
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
        const response = await axios.post(`/api/GetAssessments`, { endPoint: endPoint, subjectId:subject_id });
        console.log('Response data is:', JSON.stringify(response.data.assessments));
        setAssessmentData(response.data.assessments); // Assuming response data is the final data we need
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    // filtering assessments
    const result = assessmentData.filter((assessment) => {
      return assessment.student_first_name.toLowerCase().match(search.toLocaleLowerCase()) || 
             assessment.student_last_name.toLowerCase().match(search.toLocaleLowerCase());
    });
    fetchData();
    setFilter(result);
  }, [search, assessmentData]); // include assessments in the dependencies array

  if (loading) {
    return <Loader />;
  }
  if (error) {
    console.log(error);
  }

  return (
    <>
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
                    <Link href={`/Tutors/assessments/selection/${subject_id}`}>
                  <div className=" flex bg-mainColor text-white py-2 px-4 rounded-sm items-center justify-center">
                    <FaArrowLeft className="mr-2" />
                    Back
                  </div>
                    </Link>

                </button>
                <h2 className="text-2xl font-bold text-blue-600">Assessments</h2>
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
    </>
  );
};

export default ViewAssessments;
