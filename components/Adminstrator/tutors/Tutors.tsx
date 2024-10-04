"use client";
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv, FaChalkboardTeacher } from 'react-icons/fa';
import Link from 'next/link';
import ShowTutor from './ShowTutor';
import { formatDateToWords } from '@/utils/DateFormat';

// Define the Tutor interface
interface Tutor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  hire_date: string;
  department_name?: string;
  bio?: string;
}

const Tutors: React.FC = () => {
  const [tutorData, setTutorData] = useState<Tutor[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Tutor[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'tutors';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTutorModal, setShowTutorModal] = useState(false);

  // Define columns for the data table
  const columns: TableColumn<Tutor>[] = [
    {
      name: 'Full Name',
      selector: (row: Tutor) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: 'Email Address',
      selector: (row: Tutor) => row.email,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row: Tutor) => row.phone || 'N/A',
      sortable: true,
    },
    {
      name: 'Hire Date',
      selector: (row: Tutor) => formatDateToWords(row.hire_date),
      sortable: true,
    },
    {
      name: 'Department',
      selector: (row: Tutor) => row.department_name || 'N/A',
      sortable: true,
    },
    {
      name: 'Action',
      grow: 2,
      cell: (row: Tutor) => (
        <div className="flex justify-around">
          <Link href={`/Admin/tutors/show/${row.id}`}>
            <button
              className="mr-4 rounded bg-blue-500 px-2 py-2 text-white hover:bg-blue-400"
            >
              <FaEye className="mr-2 inline-block" /> View
            </button>
          </Link>
          <Link href={`/Admin/tutors/edit/tutor/${row.id}`}>
            <button
              className="mr-4 rounded bg-blue-400 px-2 py-2 text-white hover:bg-yellow-400"
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

  const fetchData = async () => {
    try {
      const response = await axios.post(`/api/GetData`, { endPoint });
      setTutorData(response.data.tutors); // Assume response has the correct structure
    } catch (error: any) {
      setError(error.response?.statusText || error.message);
      console.error('Fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = tutorData.filter((tutor) =>
      tutor.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(result);
  }, [search, tutorData]);

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
              <div className="flex justify-between items-center bg-blue-400 p-6 rounded-t-lg">
                <h2 className="text-2xl font-bold text-white">Teachers Table</h2>
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
                  fixedHeader
                  highlightOnHover
                  subHeader
                  subHeaderComponent={
                    <input
                      type="text"
                      className="w-25 mb-5 rounded-md border bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:ring-blue-300"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </motion.div>
        {/* {showTutorModal && <ShowTutor id={id} setShowTutorModal={setShowTutorModal} />} */}
      </div>
    </>
  );
};

export default Tutors;
