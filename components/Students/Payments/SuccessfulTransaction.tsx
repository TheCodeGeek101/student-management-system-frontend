import React from 'react';
import Link from 'next/link';
import { User } from '@/types/user';
import { formatDateToWords } from '@/utils/DateFormat';

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

const SuccessfulTransaction: React.FC<SuccessfulTransactionProps> = ({ transactionData }) => {
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
              <strong>Transaction Ref:</strong> {transactionData.data.tx_ref}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Amount:</strong> {transactionData.data.amount} {transactionData.data.currency}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Payment Type:</strong> {transactionData.data.type}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Payment Date:</strong> {formatDateToWords(transactionData.data.created_at)}
            </div>
            <div className="text-sm text-gray-700 mt-2">
              <strong>Item:</strong> {transactionData.data.customization.title}
            </div>
            <div className="text-sm text-gray-700">
              <strong>Description:</strong> {transactionData.data.customization.description}
            </div>

            <div className="mt-5">
              <div className="text-lg font-bold mb-2 text-gray-600">Customer Information</div>
              <div className="text-sm text-gray-700">
                <strong>Name:</strong> {transactionData.data.customer.first_name} {transactionData.data.customer.last_name}
              </div>
              <div className="text-sm text-gray-700">
                <strong>Email:</strong> {transactionData.data.customer.email}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-lg font-bold mb-2 text-gray-600">Authorization Information</div>
              <div className="text-sm text-gray-700">
                <strong>Channel:</strong> {transactionData.data.authorization.channel}
              </div>
              {transactionData.data.authorization.card_number && (
                <div className="text-sm text-gray-700">
                  <strong>Card Number:</strong> {transactionData.data.authorization.card_number}
                </div>
              )}
              {transactionData.data.authorization.brand && (
                <div className="text-sm text-gray-700">
                  <strong>Card Brand:</strong> {transactionData.data.authorization.brand}
                </div>
              )}
              {transactionData.data.authorization.expiry && (
                <div className="text-sm text-gray-700">
                  <strong>Expiry:</strong> {transactionData.data.authorization.expiry}
                </div>
              )}
            </div>
{/* 
            <div className="mt-5">
              <div className="text-lg font-bold mb-2">Logs</div>
              {transactionData.data.logs.map((log, index) => (
                <div key={index} className="text-sm text-gray-700">
                  <strong>{new Date(log.created_at).toLocaleString()}:</strong> {log.message}
                </div>
              ))}
            </div> */}
          </div>
        )}

        <Link href="/Student/Payments/transactions">
          <button className="h-10 px-5 mt-5 text-blue-400 transition-colors duration-150 border border-gray-300 rounded-sm focus:shadow-outline hover:bg-primary hover:text-white">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessfulTransaction;
