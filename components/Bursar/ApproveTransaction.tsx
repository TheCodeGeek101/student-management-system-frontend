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
  let displayName = 'User';
  let adminId = 0;

  if ('admin' in user) {
    displayName = `${user.admin.full_name} `;
    adminId = user.admin.id;
  }

   const approvePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('tx reference:', transactionData.data.tx_ref);
    console.log('admin ID:', adminId);
    setIsLoading(true); // Set loading to true before starting the request

    try {
      const response = await axios.post(`/api/validatePayment`, {
        adminId: adminId,
        data: {
          tx_ref:transactionData.data.tx_ref
        },
      });

      if (response.status === 200) {
        toast.success('Payment confirmed successfully');
      }
      else {
        toast.error(response.data.error || 'Unexpected error occured');
      }
    } catch (error) {
      console.error('Error during payment approval:', error);
      toast.error('An error occurred while approving the payment.');
    } finally {
      setIsLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="wrapper">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
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
                  <strong>Expiry:</strong> {transactionData.data.authorization.expiry || 'N/A'}
                </div>
              )}
            </div>
          </div>
        )}
        <form onSubmit={approvePayment}>
            <div className="container bottom-1 mb-4 mt-4 flex space-x-20 justify-center">
              <Link href={`/Admin/payments/transactions/recent`}>
                <button className="text-lg text-primary font-semibold px-5 py-2 hover:border-2 hover:bg-mainColor transition duration-300 hover:text-white border border-mainColor">
                  &larr; Back
                </button>
              </Link>

          <button
            type="submit"
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
      <Toaster position="top-center" />
    </div>
  );
};

export default ApproveTransaction;
