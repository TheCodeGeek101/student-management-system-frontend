"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv, FaUserGraduate } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import Loader from '@/components/Shared/Loader';
import ShowStudent from './ShowStudent';
import { formatDateToWords } from '@/utils/DateFormat';

const Students: React.FC = () => {
  const [search, setSearch] = useState('');
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [filter, setFilter] = useState<Student[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'students';
  const [loading, setLoading] = useState(true);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    {
      name: 'Registration Number',
      selector: (row: Student) => row.registration_number,
      grow: 3
    },
    {
      name: 'Full Name',
      selector: (row: Student) => `${row.first_name} ${row.last_name}`,
    },
    {
      name: 'Gender',
      selector: (row: Student) => (row.gender === 'F' ? 'Female' : 'Male'),
    },
    {
      name: 'Email Address',
      selector: (row: Student) => row.email,
    },
    {
      name: 'Admission Date',
      selector: (row: Student) => formatDateToWords(row.admission_date),
      grow: 2
    },
    {
      name: 'Medical Info',
      selector: (row: Student) => row.medical_info || 'N/A',
    },
    {
      name: 'Enrollment Status',
      selector: (row: Student) => row.enrollment_status,
      grow: 2
    },
    {
      name: 'Action',
      grow: 3,
      cell: (row: Student) => (
        <div className="flex justify-around">
          <button
            onClick={() => {
              setShowStudentModal(true);
              setId(row.id);
              console.log('Student ID:', row.id);
            }}
            className="mr-4 rounded bg-blue-400 px-2 py-2 text-white transition duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <FaEye className="mr-2 inline-block" /> View
          </button>
          <Link href={`/Admin/students/edit/student/${row.id}`}>
            <button
              className="mr-4 rounded bg-blue-400 px-2 py-2 text-white transition duration-300 hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300"
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
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.post(`/api/GetData`, { endPoint });
        console.log('Response data is:', JSON.stringify(response.data.students));
        setStudentData(response.data.students);
        setFilter(response.data.students); // Ensure filter also gets initial data
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
    const result = studentData.filter((student) =>
      student.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(result);
  }, [search, studentData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
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
              <div className="flex justify-between items-center bg-blue-400 p-4 rounded-t-lg">
                <h2 className="text-2xl font-bold text-white">Students Table</h2>
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
                      className="w-25 mb-5 rounded-md border bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Search student..."
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
      {showStudentModal && (
        <ShowStudent id={id} setShowStudentModal={setShowStudentModal} />
      )}
    </>
  );
};

export default Students;
