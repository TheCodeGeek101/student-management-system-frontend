"use client";
import { motion } from 'framer-motion';
import React, { useState,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv, FaUserGraduate } from 'react-icons/fa';
import useFetchData from "../../../hooks/FetchDataFromTheServerHelper";
import Loader from '@/components/Shared/Loader';
import axios from 'axios';

const Students: React.FC = () => {
  const [search, setSearch] = useState('');
  const [studentData,setStudentData] = useState<Student[]>([]);
  const [filter, setFilter] = useState<Student[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'students';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const columns = [
    {
      name: 'Student ID',
      selector: (row: Student) => 'Stud-' +row.id,
    },
    {
      name: 'Full Name',
      selector: (row: Student) => `${row.first_name} ${row.last_name}`,
    },
    {
      name: 'Date of Birth',
      selector: (row: Student) => row.date_of_birth,
    },
    // {
    //   name: 'Address',
    //   selector: (row: Student) => row.address,
    // },
    // {
    //   name: 'Postal Address',
    //   selector: (row: Student) => row.postal_address,
    // },
    {
      name: 'Gender',
      selector: (row: Student) => (row.gender === 'F' ? 'Female' : 'Male'),
    },
    {
      name: 'Guardian Name',
      selector: (row: Student) => row.guardian_name,
    },
    {
      name: 'Guardian Contact',
      selector: (row: Student) => row.guardian_contact,
    },
    {
      name: 'Email Address',
      selector: (row: Student) => row.email,
    },
    {
      name: 'Phone Number',
      selector: (row: Student) => row.phone_number || 'N/A',
    },
    {
      name: 'Admission Date',
      selector: (row: Student) => row.admission_date,
    },
    // {
    //   name: 'Previous School',
    //   selector: (row: Student) => row.previous_school || 'N/A',
    // },
    // {
    //   name: 'Emergency Contact',
    //   selector: (row: Student) => row.emergency_contact || 'N/A',
    // },
    {
      name: 'Medical Info',
      selector: (row: Student) => row.medical_info || 'N/A',
    },
    {
      name: 'Enrollment Status',
      selector: (row: Student) => row.enrollment_status,
    },
    // {
    //   name: 'Remarks',
    //   selector: (row: Student) => row.remarks || 'N/A',
    // },
    {
      name: 'Action',
      grow: 2,
      cell: (row: Student) => (
        <div className="flex justify-around">
          <button
            onClick={() => {
              setId(row.id);
              console.log('Student ID:', row.id);
            }}
            className="mr-4 rounded bg-blue-500 px-2 py-2 text-white transition duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <FaEye className="mr-2 inline-block" /> View
          </button>
          <button
            onClick={() => {
              setId(row.id);
              console.log('Edit Student ID:', row.id);
            }}
            className="mr-4 rounded bg-yellow-500 px-2 py-2 text-white transition duration-300 hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300"
          >
            <FaEdit className="mr-2 inline-block" /> Update
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

  const handleClick = () => {
    // Handle button click
  };
  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await axios.post(`/api/GetData`, { endPoint:endPoint });
        console.log('Response data is:', JSON.stringify(response.data.students));
        setStudentData(response.data.students); // Assuming response data is the final data we need
      } catch (error:any) {
        // Axios throws an error when the server returns a status outside the 2xx range
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }

    }
    

    // filtering students
    const result = studentData.filter((student) => {
      return student.email.toLowerCase().match(search.toLocaleLowerCase());
    });
    fetchData();
    setFilter(result);

  }, [search, studentData]); // include clients in the dependencies array

  if (loading) {
    return <Loader />;
  }
  if(error){
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
        <div className="mb-8 mt-20 flex  flex-col gap-12">
          <div className="bg-white shadow rounded-lg">
            <div className="flex justify-between items-center bg-gray-100 p-6 rounded-t-lg">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-blue-600">
                  Students
                </h2>
                <FaUserGraduate className="ml-2 text-2xl text-blue-600" />
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
                actions={
                  <button
                    onClick={handleClick}
                    className="rounded bg-mainColor px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300"
                  >
                    <div className="flex items-center justify-center">
                      <FaFileCsv className="mr-2" />
                      Export CSV
                    </div>
                  </button>
                }
                subHeader
                subHeaderComponent={
                  <input
                    type="text"
                    className="w-25 rounded-md border bg-white py-2 px-4 text-gray-900 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
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
}

export default Students;
