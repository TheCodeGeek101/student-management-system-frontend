"use client";
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaFileCsv, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import Loader from '@/components/Shared/Loader';
import Link from "next/link";
import { User } from '@/types/user';
import { FaArrowLeft } from 'react-icons/fa6';


interface Transaction {
  title: string;
  description: string;
  tx_ref: string;
  amount: number;
  currency: string;
  confirmed: boolean;
  student_first_name: string;
  student_last_name: string;
  class_name: string;
  term_name: string;
}

interface TransactionProps {
  user:User
}

const ConfirmedTransactions: React.FC<TransactionProps> = ({user}) => {
  const [search, setSearch] = useState('');
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<Transaction[]>([]);
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const endPoint = 'payments/confirmed';

  let studentId = 0;
  if ('student' in user) {
    studentId = user.student.id;
  }

  const columns = [
    {
      name: 'Student',
      selector: (row: Transaction) => `${row.student_first_name} ${row.student_last_name}`,
    },
    {
      name: 'Class',
      selector: (row: Transaction) => row.class_name,
    },
    {
      name: 'Term',
      selector: (row: Transaction) => row.term_name,
    },
    {
      name: 'Title',
      selector: (row: Transaction) => row.title,
    },
    {
      name: 'Amount',
      selector: (row: Transaction) => `${row.currency} ${row.amount}`,
    },
    {
      name: 'Transaction Ref',
      selector: (row: Transaction) => row.tx_ref,
      grow:2
    },
    {
      name: 'Confirmed',
      selector: (row: Transaction) => (row.confirmed ? 'Yes' : 'No'),
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

        const response = await axios.post(`/api/GetData`, { endPoint: endPoint });
        setTransactionData(response.data.payments); // Assuming the API returns an array of transactions
        setFilter(response.data.payments); // Set filtered data initially to all transactions
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
    const result = transactionData.filter((transaction) =>
      transaction.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(result);
  }, [search, transactionData]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.6 }}
        >
          <div className="mb-8 mt-20 flex flex-col gap-12">
            <div className="bg-white shadow rounded-lg">
              <div className="flex justify-between items-center bg-blue-400 p-6 rounded-t-lg">
                <Link href={`/Admin/payments/transactions/transaction`}>
                  <button
                    onClick={() => console.log('Back button clicked')}
                    className="mr-4 rounded  px-4 py-2 text-sm font-medium text-black transition duration-300  focus:outline-none focus:ring focus:ring-gray-300"
                  >
                    <div className="flex bg-white/30 text-white py-2 px-4 rounded-sm items-center hover:bg-blue-800 transition duration-300 ease-in justify-center">
                      <FaArrowLeft className="mr-2" />
                      Back
                    </div>
                  </button>
                </Link>
                <h2 className="text-2xl font-bold text-white"> Confirmed Payments Table</h2>
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
                      className="w-25 mb-5 rounded-md border bg-white py-2 px-4 text-gray-900 focus:border-blue-400"
                      placeholder="Search transaction..."
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
    </>
  );
};

export default ConfirmedTransactions;
