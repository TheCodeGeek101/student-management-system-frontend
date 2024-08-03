"use client";
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
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
  const [tutorData,setTutorData] = useState<Tutor[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Tutor[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'tutors';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTutorModal, setShowTutorModal] = useState(false);

  const columns = [
    {
      name: 'Full Name',
      selector: (row: Tutor) => `${row.first_name} ${row.last_name}`,
    },
    {
      name: 'Email Address',
      selector: (row: Tutor) => row.email,
    },
    {
      name: 'Phone Number',
      selector: (row: Tutor) => row.phone || 'N/A',
    },
    {
      name: 'Hire Date',
      selector: (row: Tutor) => formatDateToWords(row.hire_date),
    },
    {
      name: 'Department',
      selector: (row: Tutor) => row.department_name || 'N/A',
    },
    {
      name: 'Action',
      grow: 2,
      cell: (row: Tutor) => (
        <div className="flex justify-around">
          <button
            onClick={() => {
              setShowTutorModal(true);
              setId(row.id);
              console.log('Tutor ID:', row.id);
            }}
            className="mr-4 rounded bg-blue-500 px-2 py-2 text-white transition duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <FaEye className="mr-2 inline-block" /> View
          </button>
        <Link href={`/Admin/tutors/edit/tutor/${row.id}`}>
          <button
              onClick={() => {
                setId(row.id);
                console.log('Edit Tutor ID:', row.id);
              }}
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

  const handleClick = () => {
    // Handle button click
  };

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await axios.post(`/api/GetData`, { endPoint:endPoint });
        console.log('Response data is:', JSON.stringify(response.data.tutors));
        setTutorData(response.data.tutors); // Assuming response data is the final data we need
      } catch (error:any) {
        // Axios throws an error when the server returns a status outside the 2xx range
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }

    }
    
      // filtering tutors
      const result = tutorData.filter((tutor) => {
        return tutor.email.toLowerCase().match(search.toLocaleLowerCase());
      });
      fetchData();
      setFilter(result);
  },[search,tutorData]);

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
                <h2 className="text-2xl font-bold text-blue-600">
                  Teachers
                </h2>
                {/* <FaChalkboardTeacher className="ml-2 text-2xl text-blue-600" /> */}
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
                subHeaderAlign={ "left" as any}
              />
            </div>
          </div>
        </div>
      </motion.div>
       {/* Client details modal */}
       {showTutorModal && (
            <ShowTutor id={id} setShowTutorModal={setShowTutorModal} />
          )}
    </>
  );
}

export default Tutors;
