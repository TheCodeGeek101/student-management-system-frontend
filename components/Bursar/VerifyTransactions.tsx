import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '@/types/user';
import SuccessfulTransaction from './ApproveTransaction';
import toast, { Toaster } from 'react-hot-toast';
import TransactionLoader from '../Shared/Loaders/TransactionLoader';
import FailedTransaction from './FailedTransaction';
import ApproveTransaction from './ApproveTransaction';

interface TransactionProps {
  user: User;
  tx_ref: string; 
}

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


const VerifyTransaction: React.FC<TransactionProps> = ({ tx_ref, user }) => {
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const response = await axios.post('/api/verifyTransaction', { tx_ref });

        if (response.status === 200) {
          toast.success('Transaction verified successfully!');
          setTransactionData(response.data); // Store transaction data
          setIsTransactionSuccessful(response.data.data.status === 'success'); // Check if the transaction was successful
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        setIsTransactionSuccessful(false); // Set failure state
      }
    };

    verifyTransaction();
  }, [tx_ref]);

  // Handle error and pass the error message and transactionData (which might be null)
  if (error) {
    return <FailedTransaction transactionData={transactionData} error={error} />;
  }

  // Handle failed transaction scenario with null-safe check
  if (isTransactionSuccessful === false) {
    return <FailedTransaction transactionData={transactionData} error="Transaction failed" />;
  }

  // Handle successful transaction scenario
  if (transactionData && isTransactionSuccessful) {
    return <ApproveTransaction transactionData={transactionData} user={user} />;
  }

  // Show loader while waiting for transaction verification
  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <TransactionLoader />
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default VerifyTransaction;
