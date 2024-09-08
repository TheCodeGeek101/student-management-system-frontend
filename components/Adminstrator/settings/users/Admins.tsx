import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';
import Loader from '@/components/Shared/Loader';
import { FaArrowLeft } from 'react-icons/fa6';
import { formatDateToWords } from '@/utils/DateFormat';
// Define the Administrator interface
interface Administrator {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  department: string;
  position: string;
  date_of_hire: string; // Store as string, since it's formatted later
}

const Admins: React.FC = () => {
  const [search, setSearch] = useState('');
  const [adminData, setAdminData] = useState<Administrator[]>([]);
  const [filteredData, setFilteredData] = useState<Administrator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);

  const endPoint = 'admin'; // Update endpoint if necessary

  // Define table columns with TypeScript for better type safety
  const columns: TableColumn<Administrator>[] = [
    {
      name: 'Admin ID',
      selector: (row: Administrator) => row.id.toString(),
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: (row: Administrator) => row.full_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: Administrator) => row.email,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row: Administrator) => row.phone_number,
      sortable: true,
    },
    {
      name: 'Department',
      selector: (row: Administrator) => row.department,
      sortable: true,
    },
    {
      name: 'Position',
      selector: (row: Administrator) => row.position,
      sortable: true,
    },
    {
      name: 'Date of Hire',
      selector: (row: Administrator) => formatDateToWords(row.date_of_hire),
      grow:2,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: Administrator) => (
        <div className="flex justify-around">
          <button
            onClick={() => setId(row.id)}
            className="mr-4 rounded bg-blue-400 px-2 py-2 text-white transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <FaEye className="mr-2 inline-block" /> View
          </button>
          <Link href={`/Administrator/admins/edit/${row.id}`}>
            <button
              className="rounded bg-blue-400 px-2 py-2 text-white transition duration-300 hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
            >
              <FaEdit className="mr-2 inline-block" /> Edit
            </button>
          </Link>
        </div>
      ),
      grow: 2,
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

  // Fetch administrators data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/GetData', { endPoint });
        setAdminData(response.data.admins); // Assuming response has 'admins' key
        setFilteredData(response.data.admins); // Set filtered data initially
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint]);

  // Filter admins based on search input
  useEffect(() => {
    const result = adminData.filter((admin) =>
      admin.full_name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search, adminData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
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
              <Link href={`/Admin/settings/Usermanagement/Index`}>
                <button className="mr-4 rounded px-4 py-2 text-sm font-medium text-white transition duration-300 focus:outline-none focus:ring focus:ring-gray-300">
                  <div className="flex items-center bg-white/30 text-white py-2 px-4 rounded-sm">
                    <FaArrowLeft className="mr-2" />
                    Back
                  </div>
                </button>
              </Link>
              <h2 className="text-2xl font-bold text-white">Administrators Table</h2>
            </div>
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
                  placeholder="Search Admins..."
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
  );
};

export default Admins;
