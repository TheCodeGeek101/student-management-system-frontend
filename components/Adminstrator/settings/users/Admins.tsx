import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import Loader from '@/components/Shared/Loader';
import { FaArrowLeft } from 'react-icons/fa6';

// Define the Adminstrator interface based on the expected data structure


const Admins: React.FC = () => {
  const [search, setSearch] = useState('');
  const [adminData, setAdminData] = useState<Adminstrator[]>([]);
  const [filter, setFilter] = useState<Adminstrator[]>([]);
  const [id, setId] = useState<number>(0);
  const endPoint = 'admin'; // Update endpoint to match new data type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = [
    {
      name: 'Admin ID',
      selector: (row: Adminstrator) => row.id,
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: (row: Adminstrator) => row.full_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: Adminstrator) => row.email,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row: Adminstrator) => row.phone_number,
      sortable: true,
    },
    {
      name: 'Department',
      selector: (row: Adminstrator) => row.department,
      sortable: true,
    },
    {
      name: 'Position',
      selector: (row: Adminstrator) => row.position,
      sortable: true,
    },
    {
      name: 'Date of Hire',
      selector: (row: Adminstrator) => new Date(row.date_of_hire).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Action',
      grow:2,
      cell: (row: Adminstrator) => (
        <div className="flex justify-around">
          <button
            onClick={() => {
              setId(row.id);
            }}
            className="mr-4 rounded bg-blue-500 px-2 py-2 text-white transition duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <FaEye className="mr-2 inline-block" /> View
          </button>
          <Link href={`/Adminstrator/admins/edit/${row.id}`}>
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
        console.log('Response data is:', JSON.stringify(response.data.admins));
        setAdminData(response.data.admins); // Assuming response data is the final data we need
        setFilter(response.data.admins); // Set initial filter data
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

   const result = adminData.filter((admin) => {
      return admin.full_name.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
    fetchData();
  }, [endPoint,search, adminData]);

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
                  <button
                  className="mr-4 rounded bg-gray-300 px-4 py-2 text-sm font-medium text-black transition duration-300 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
                >
                    <Link href={`/Admin/settings/Usermanagement/Index`}>
                  <div className=" flex bg-mainColor text-white py-2 px-4 rounded-sm items-center justify-center">
                    <FaArrowLeft className="mr-2" />
                    Back
                  </div>
                    </Link>
                </button>
                <h2 className="text-2xl font-bold text-blue-600">Adminstrators</h2>
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
    </>
  );
};

export default Admins;
