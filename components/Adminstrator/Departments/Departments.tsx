import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import Loader from '@/components/Shared/Loader';
import { Department } from '@/types/department';
import ShowDepartment from './ShowDepartment';

const Departments: React.FC = () => {
  const [search, setSearch] = useState('');
  const [departmentData, setDepartmentData] = useState<Department[]>([]);
  const [filter, setFilter] = useState<Department[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'department'; // Update endpoint to match new data type
  const [loading, setLoading] = useState(true);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    {
      name: 'Department ID',
      selector: (row: Department) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row: Department) => row.name,
      sortable: true,
    },
    {
      name: 'Code',
      selector: (row: Department) => row.code,
      sortable: true,
    },
    {
      name: 'Head of Department',
      selector: (row: Department) => row.tutor_first_name + " "+ row.tutor_last_name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row: Department) => row.description,
      sortable: true,
      grow:2
    },
    
    {
      name: 'Action',
      cell: (row: Department) => (
        <div className="flex justify-around">
          <button
            onClick={() => {
              setShowDepartmentModal(true);
              setId(row.id);
            }}
            className="mr-4 rounded bg-blue-500 px-2 py-2 text-white transition duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <FaEye className="mr-2 inline-block" /> View
          </button>
          <Link href={`/Admin/departments/edit/department/${row.id}`}>
            <button
              onClick={() => setId(row.id)}
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
      try {
        const response = await axios.post(`/api/GetData`, { endPoint: endPoint });
        console.log('Response data is:', JSON.stringify(response.data.departments));
        setDepartmentData(response.data.departments); // Assuming response data is the final data we need
        setFilter(response.data.departments); // Set initial filter data
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
    // Filtering logic
    const result = departmentData.filter((department) => {
      return department.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [search, departmentData]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error}</div>;
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
                <h2 className="text-2xl font-bold text-blue-600">Departments</h2>
              </div>
              <button
                onClick={() => console.log('Export CSV clicked')}
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
      {/* Department details modal */}
      {showDepartmentModal && (
        <ShowDepartment id={id} setShowDepartmentModal={setShowDepartmentModal} />
      )}
    </>
  );
};

export default Departments;
