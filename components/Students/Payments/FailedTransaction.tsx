import ServerError from '@/components/Shared/Errors/ServerError';
import Link from 'next/link';
import React from 'react';

/**
 * Component for handling and displaying a failed transaction.
 */

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

interface TransactionProps {
  transactionData: TransactionData | null; // transactionData can be null
  error: string;
}

const FailedTransaction: React.FC<TransactionProps> = ({ transactionData, error }) => {
  if (error) {
    return (
      <div className="container min-h-screen md:mt-10">
        <div className="flex flex-col items-center">
          <div className="text-red-500 font-semibold">
            <ServerError/>
          </div>
          <Link href='/Student/Payments/Index'>
                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
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

                            <span>Go back</span>

                        </button>
                    </Link>
        </div>
      </div>
    );
  }

  if (!transactionData) {
    return (
      <div className="container md:mt-10">
        <div className="flex flex-col items-center">
          <div className="mt-3 text-xl font-semibold uppercase text-red-500">
            Failed!
          </div>
          <div className="text-lg font-semibold text-gray-500">
            No transaction data available.
          </div>
          <Link href="/Auth">
            <button className="h-10 px-5 mt-5 text-[#d03434] transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-[#d03434] hover:text-green-100">
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
            className="error-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="error-icon__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="error-icon__line"
              fill="none"
              d="M14 14l24 24M14 38l24-24"
            />
          </svg>
        </div>

        <div className="mt-3 text-xl font-semibold uppercase text-red-500">
          Failed!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Payment has not been made!
        </div>

        <div className="mt-5 w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="text-lg font-bold mb-2">Transaction Details</div>
          <div className="text-sm text-gray-700">
            <strong>Transaction Ref:</strong> {transactionData.data.tx_ref}
          </div>
          <div className="text-sm text-gray-700">
            <strong>Amount:</strong> {transactionData.data.amount} {transactionData.data.currency}
          </div>
          <div className="text-sm text-gray-700">
            <strong>Payment Type:</strong> {transactionData.data.type}
          </div>
          <div className="text-sm text-gray-700">
            <strong>Payment Date:</strong> {new Date(transactionData.data.created_at).toLocaleString()}
          </div>
          <div className="text-sm text-gray-700 mt-2">
            <strong>Item:</strong> {transactionData.data.customization.title}
          </div>
          <div className="text-sm text-gray-700">
            <strong>Description:</strong> {transactionData.data.customization.description}
          </div>

          <div className="mt-5">
            <div className="text-lg font-bold mb-2">Customer Information</div>
            <div className="text-sm text-gray-700">
              <strong>Name:</strong> {transactionData.data.customer.first_name} {transactionData.data.customer.last_name}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Email:</strong> {transactionData.data.customer.email}
            </div>
          </div>

          <div className="mt-5">
            <div className="text-lg font-bold mb-2">Logs</div>
            {transactionData.data.logs.map((log, index) => (
              <div key={index} className="text-sm text-gray-700">
                <strong>{log.created_at}:</strong> {log.message}
              </div>
            ))}
          </div>
        </div>

        <Link href="/Auth">
          <button className="h-10 px-5 mt-5 text-[#d03434] transition-colors duration-150 border border-gray-300 rounded-lg focus:shadow-outline hover:bg-[#d03434] hover:text-green-100">
            Close
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FailedTransaction;
