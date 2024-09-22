import React, { useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/user';
import { formatDateToWords } from '@/utils/DateFormat';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface TransactionData {
  status: string;
  message: string;
  data: {
    tx_ref: string;
    amount: number;
    currency: string;
    type: string;
    created_at: string;
    customization: {
      title: string;
      description: string;
      logo: string | null;
    };
    authorization: {
      channel: string;
      card_number: string | null;
      expiry: string | null;
      brand: string | null;
      provider: string;
      mobile_number: string;
      completed_at: string;
    };
    customer: {
      email: string;
      first_name: string;
      last_name: string;
    };
    logs: {
      type: string;
      message: string;
      created_at: string;
    }[];
  };
}

interface SuccessfulTransactionProps {
  transactionData: TransactionData;
  user: User;
}

const ApproveTransaction: React.FC<SuccessfulTransactionProps> = ({ transactionData, user }) => {
  const [loading, setIsLoading] = useState<boolean>(false);
  let displayName = "User";
  let adminId = 0;

  if ("admin" in user) {
    displayName = `${user.admin.full_name} `;
    adminId = user.admin.id; 
  }

  const approvePayment = async () => {
    setIsLoading(true);
    const response = await axios.post('api/approvePayment',{
      adminId:adminId,
      data:transactionData.data.tx_ref
    });

    if(response.status === 200)
    {
      toast.success('Payment confirmed successfully');
      const res = await axios.post('api/storeTransaction',{
        data:transactionData
      });
      if(res.status === 200){
          console.log('transaction recorded');
      }
    }
  }
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div className="mt-3 text-2xl font-semibold uppercase text-green-500">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Transaction verified successfully
        </div>

        {transactionData && (
          <div className="mt-5 w-full max-w-2xl p-8 bg-gray-100 rounded-lg shadow-md">
            <div className="text-lg font-bold mb-2 text-gray-600">Payment Details</div>
            <div className="text-sm text-gray-700">
              <strong>Transaction Ref:</strong> {transactionData.data.tx_ref || 'N/A'}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Amount:</strong> {transactionData.data.amount} {transactionData.data.currency || 'N/A'}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Payment Type:</strong> {transactionData.data.type || 'N/A'}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Payment Date:</strong> {formatDateToWords(transactionData.data.created_at) || 'N/A'}
            </div>
            <div className="text-sm text-gray-700 mt-2">
              <strong>Item:</strong> {transactionData.data.customization.title || 'N/A'}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Description:</strong> {transactionData.data.customization.description || 'N/A'}
            </div>

            <div className="mt-5">
              <div className="text-lg font-bold mb-2 text-gray-600">Customer Information</div>
              <div className="text-sm text-gray-700">
                <strong>Name:</strong> {transactionData.data.customer.first_name || 'N/A'} {transactionData.data.customer.last_name || 'N/A'}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Email:</strong> {transactionData.data.customer.email || 'N/A'}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-lg font-bold mb-2 text-gray-600">Authorization Information</div>
              <div className="text-sm text-gray-700">
                <strong>Channel:</strong> {transactionData.data.authorization.channel || 'N/A'}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Provider:</strong> {transactionData.data.authorization.provider || 'N/A'}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Mobile Number:</strong> {transactionData.data.authorization.mobile_number || 'N/A'}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Completed At:</strong> {formatDateToWords(transactionData.data.authorization.completed_at) || 'N/A'}
              </div>
              {transactionData.data.authorization.card_number && (
                <div className="text-sm text-gray-700">
                  <strong>Card Number:</strong> {transactionData.data.authorization.card_number || 'N/A'} 
                </div>
              )}
              {transactionData.data.authorization.brand && (
                <div className="text-sm text-gray-700">
                  <strong>Card Brand:</strong> {transactionData.data.authorization.brand || 'N/A'}
                </div>
              )}
              {transactionData.data.authorization.expiry && (
                <div className="text-sm text-gray-700">
                  <strong>Expiry:</strong> {transactionData.data.authorization.expiry  || 'N/A'}
                </div>
              )}
            </div>

            {/* Uncomment below if you want to include logs */}
            {/* <div className="mt-5">
              <div className="text-lg font-bold mb-2">Logs</div>
              {transactionData.data.logs.map((log, index) => (
                <div key={index} className="text-sm text-gray-700">
                  <strong>{new Date(log.created_at).toLocaleString()}:</strong> {log.message}
                </div>
              ))}
            </div> */}
          </div>
        )}

        <div className="mt-5 flex justify-around">
          <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-sm gap-x-2 sm:w-auto hover:bg-gray-100 dark:border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <Link href="/Student/Payments/transactions">
              <span>Go Back</span>
            </Link>
          </button>

          <button
            onClick={() => approvePayment()}
            className={`w-28 py-2 font-semibold uppercase transition ${
              loading
                ? 'cursor-not-allowed bg-primary text-white opacity-70'
                : 'bg-primary text-white hover:border-2 hover:bg-white hover:text-primary'
            } md:w-40`}
          >
            {loading ? 'Approving...' : 'Approve'}
          </button>
        </div>
      </div>
      <Toaster position='top-center'/>
    </div>
  );
};

export default ApproveTransaction;
