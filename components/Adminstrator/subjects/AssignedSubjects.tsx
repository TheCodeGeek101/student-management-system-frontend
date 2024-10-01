"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaFileCsv } from 'react-icons/fa';
import axios from 'axios';
import DataLoader from '@/components/Shared/Loaders/Loader';
import Link from 'next/link';

interface Subject {
  id:number;
  tutor_first_name: string;
  tutor_last_name: string;
  assigned_by: string;
  subject_name: string;
  subject_code: string;
  department_name: string;
  class_name: string;
}

const AssignedSubjects: React.FC = () => {
  const [id, setId] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [subjectData, setSubjectData] = useState<Subject[]>([]);
  const [filter, setFilter] = useState<Subject[]>([]);
  const endPoint = 'subjects/tutors';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    {
      name: 'Teacher Name',
      selector: (row: Subject) => row.tutor_first_name + ' ' + row.tutor_last_name ,
    },
    {
      name: 'Department',
      selector: (row: Subject) => row.department_name,
    },
    {
      name: 'Subject',
      selector: (row: Subject) => row.subject_name,
    },
    {
      name: 'Code',
      selector: (row: Subject) => row.subject_code,
    },
    {
      name: 'Class',
      selector: (row: Subject) => row.class_name,
    },
    {
      name: 'Allocated by',
      selector: (row: Subject) => row.assigned_by,
    },
    {
        name: 'Action',
        grow:2,
        cell: (row: Subject) => (
          <div className="flex justify-around">          
           <Link href='#'>
              <button
                onClick={() => {
                  setId(row.id);
                  console.log('Edit Subject ID:', row.id);
                }}
                className="mr-4 rounded bg-blue-400 px-2 py-2 text-white transition duration-300 hover:bg-blue-200 focus:outline-none focus:ring focus:ring-yellow-300"
              >
                <FaEdit className="mr-2 inline-block" /> Re-assign
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/GetData`, { endPoint });
        console.log('Response data is:', JSON.stringify(response.data.subjects));
        setSubjectData(response.data.subjects); // Assuming response data is the final data we need
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint]);

  useEffect(() => {
    const result = subjectData.filter((subject) => {
      return (
        subject.tutor_first_name.toLowerCase().includes(search.toLowerCase()) ||
        subject.tutor_last_name.toLowerCase().includes(search.toLowerCase()) ||
        subject.subject_name.toLowerCase().includes(search.toLowerCase()) ||
        subject.subject_code.toLowerCase().includes(search.toLowerCase()) ||
        subject.class_name.toLowerCase().includes(search.toLowerCase()) ||
        subject.department_name.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilter(result);
  }, [search, subjectData]);

  if (loading) {
    return <DataLoader />;
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
            <div className="flex justify-between items-center bg-blue-400 p-6 rounded-t-lg">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-white">Subject Allocation</h2>
              </div>
              <button
                onClick={() => {}}
                className="rounded bg-white/50 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-primary focus:outline-none focus:ring focus:ring-green-300"
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

export default AssignedSubjects;
