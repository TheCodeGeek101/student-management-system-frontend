"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import Loader from '@/components/Shared/Loader';
import ShowSubject from './ShowSubject';
import AssignSubject from './AssignSubject';

interface Subject {
  id: number;
  name: string;
  code: string;
  description: string;
  credits: number;
  class_name: string;
  department_name: string;
}

const Subjects: React.FC = () => {
  const [search, setSearch] = useState('');
  const [subjectData, setSubjectData] = useState<Subject[]>([]);
  const [filter, setFilter] = useState<Subject[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'subjects';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [assignSubjectModal, setAssignSubjectModal] = useState(false);

  const columns = [
    {
      name: 'Subject ID',
      selector: (row: Subject) => 'Sub-' + row.id,
    },
    {
      name: 'Name',
      selector: (row: Subject) => row.name,
    },
    {
      name: 'Code',
      selector: (row: Subject) => row.code,
    },
    {
      name: 'Credits',
      selector: (row: Subject) => row.credits,
    },
    {
      name: 'Department',
      selector: (row: Subject) => row.department_name,
    },
    {
      name: 'Class',
      selector: (row: Subject) => row.class_name,
    },
    {
      name: 'Action',
      grow: 4,
      cell: (row: Subject) => (
        <div className="flex justify-around">
          <button
            onClick={() => {
              setShowSubjectModal(true);
              setId(row.id);
            }}
            className="mr-4 rounded bg-blue-500 px-2 py-2 text-white transition duration-300 hover:bg-blue-400"
          >
            <FaEye className="mr-2 inline-block" /> View
          </button>
          <Link href={`/Admin/subjects/edit/subject/${row.id}`}>
            <button className="mr-4 rounded bg-blue-400 px-2 py-2 text-white transition duration-300 hover:bg-blue-200">
              <FaEdit className="mr-2 inline-block" /> Edit
            </button>
          </Link>
          <button
            onClick={() => {
              setAssignSubjectModal(true);
              setId(row.id);
            }}
            className="mr-4 rounded bg-green-500 px-2 py-2 text-white transition duration-300 hover:bg-green-400"
          >
            <FaUserPlus className="mr-2 inline-block" /> Assign
          </button>
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
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/GetData`, { endPoint });
        setSubjectData(response.data.subjects);
        setFilter(response.data.subjects); // Set filtered data initially to all subjects
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const result = subjectData.filter((subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(result);
  }, [search, subjectData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.6 }}
        >
          <div className="mb-8 mt-20 flex flex-col gap-12">
            <div className="bg-white shadow rounded-lg">
              <div className="flex justify-between items-center bg-blue-400 p-6 rounded-t-lg">
                <h2 className="text-2xl font-bold text-white">Subjects Table</h2>
                <button
              onClick={() => console.log('Export CSV clicked')}
              className="rounded bg-white/30 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-primary focus:outline-none focus:ring focus:ring-green-300"
            >
              <div className="flex items-center">
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
                      className="w-38 mb-5 rounded-md border bg-white py-2 px-4 text-gray-900 focus:border-blue-400"
                      placeholder="Search subject..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  }
                  subHeaderAlign={"left" as any}
                />
              </div>
            </div>
          </div>
          {showSubjectModal && (
            <ShowSubject id={id} setShowSubjectModal={setShowSubjectModal} />
          )}
          {assignSubjectModal && (
            <AssignSubject
              id={id}
              setAssignSubjectModal={setAssignSubjectModal}
            />
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Subjects;
