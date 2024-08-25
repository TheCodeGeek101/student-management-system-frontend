"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';
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
  term_name: string;
}

interface TermData {
  id: number;
  name: string;
}

interface AssessmentProps {
  subject_id: number;
}

const ViewAssessments: React.FC<AssessmentProps> = ({ subject_id }) => {
  const [search, setSearch] = useState('');
  const [assessmentData, setAssessmentData] = useState<Assessment[]>([]);
  const [filteredData, setFilteredData] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [terms, setTerms] = useState<TermData[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);

  const columns = [
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
      name: 'Term',
      selector: (row: Assessment) => row.term_name,
    },
    {
      name: 'Action',
      cell: (row: Assessment) => (
        <div className="flex justify-around">
          <Link href={`/Tutors/assessments/update/${row.assessment_id}`}>
            <button
              className="mr-4 rounded bg-blue-400 px-2 py-2 text-white transition duration-300 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-yellow-300"
            >
              <FaEdit className="mr-2 inline-block" /> Edit
            </button>
          </Link>
        </div>
      ),
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
    // Fetch terms
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

  useEffect(() => {
    if (selectedTermId !== null) {
      const fetchAssessments = async () => {
        setLoading(true);
        try {
          const response = await axios.post('/api/GetAssessments', { endPoint: 'assessments', subjectId: subject_id, termId: selectedTermId });
          setAssessmentData(response.data.assessments);
        } catch (error: any) {
          setError(error.response?.statusText || error.message);
          console.error('Fetch error:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAssessments();
    }
  }, [selectedTermId, subject_id]);

  useEffect(() => {
    const result = assessmentData.filter((assessment) =>
      assessment.student_first_name.toLowerCase().includes(search.toLowerCase()) ||
      assessment.student_last_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search, assessmentData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen">
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
                <Link href={`/Tutors/assessments/selection/${subject_id}`}>
                  <button
                    onClick={() => console.log('Back button clicked')}
                    className="mr-4 rounded bg-gray-300 px-4 py-2 text-sm font-medium text-black transition duration-300 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                  >
                    <div className="flex bg-mainColor text-white py-2 px-4 rounded-sm items-center justify-center">
                      <FaArrowLeft className="mr-2" />
                      Back
                    </div>
                  </button>
                </Link>
                <h2 className="text-2xl font-bold text-blue-600">Assessments</h2>
              </div>
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
            <div className="overflow-x-auto p-4">
              <DataTable
                customStyles={tableHeaderStyle}
                columns={columns}
                data={filteredData}
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
  );
};

export default ViewAssessments;
