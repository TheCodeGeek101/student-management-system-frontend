import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { User } from '@/types/user';
/**
 * Component for the final step of the form, displaying transaction details.
 */

interface TransactionProps {
  user:User
  tx_ref: string; // tx_ref should be a string as it might contain alphanumeric characters
}

interface TransactionData {
  status: string;
  message: string;
  transaction: {
    tx_ref: string;
    amount: number;
    currency: string;
    type: string;
    created_at: string;
    customization: {
      title: string;
      description: string;
    };
  };
  authorization: {
    channel: string;
    card_number: string;
    expiry: string;
    brand: string;
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
}

const SuccessfulTransaction: React.FC<TransactionProps> = ({ tx_ref,user }) => {
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const response = await axios.post('/api/verifyTransaction', {
          tx_ref: tx_ref
        });

        if (response.status === 200) {
          setTransactionData(response.data); // Store the transaction data
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
      }
    };

    verifyTransaction();
  }, [tx_ref]);

  // If there's an error, display it
  if (error) {
    return (
      <div className="container md:mt-10">
        <div className="flex flex-col items-center">
          <div className="text-red-500 font-semibold">{error}</div>
          <Link href="/Auth">
            <button className="h-10 px-5 text-red-500 transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-red-500 hover:text-white mt-5">
              Close
            </button>
          </Link>
        </div>
      </div>
    );
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

        <div className="mt-3 text-xl font-semibold uppercase text-orange-500">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Payment has been made successfully!
        </div>

        {transactionData && (
          <div className="mt-5 w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="text-lg font-bold mb-2">Payment Details</div>
            <div className="text-sm text-gray-700">
              <strong>Transaction Ref:</strong> {transactionData.transaction.tx_ref}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Amount:</strong> {transactionData.transaction.amount} {transactionData.transaction.currency}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Payment Type:</strong> {transactionData.transaction.type}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Payment Date:</strong> {new Date(transactionData.transaction.created_at).toLocaleString()}
            </div>
            <div className="text-sm text-gray-700 mt-2">
              <strong>Item:</strong> {transactionData.transaction.customization.title}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Description:</strong> {transactionData.transaction.customization.description}
            </div>

            <div className="mt-5">
              <div className="text-lg font-bold mb-2">Customer Information</div>
              <div className="text-sm text-gray-700">
                <strong>Name:</strong> {transactionData.customer.first_name} {transactionData.customer.last_name}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Email:</strong> {transactionData.customer.email}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-lg font-bold mb-2">Card Information</div>
              <div className="text-sm text-gray-700">
                <strong>Card Number:</strong> {transactionData.authorization.card_number}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Card Brand:</strong> {transactionData.authorization.brand}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Expiry:</strong> {transactionData.authorization.expiry}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-lg font-bold mb-2">Logs</div>
              {transactionData.logs.map((log, index) => (
                <div key={index} className="text-sm text-gray-700">
                  <strong>{log.created_at}:</strong> {log.message}
                </div>
              ))}
            </div>
          </div>
        )}

        <Link href="/Auth">
          <button className="h-10 px-5 mt-5 text-[#d03434] transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-[#d03434] hover:text-green-100">
            Close
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulTransaction;
