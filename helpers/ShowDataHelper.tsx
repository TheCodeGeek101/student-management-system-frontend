'use client';
import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

type UseShowDataHelper = <T>(endPoint: string, id: number, setData: (data: T) => void) => void;

const useShowDataHelper: UseShowDataHelper = (endPoint, id, setData) => {
  useEffect(() => {
    const showDetails = async () => {
      if (!id) return;

      try {
        const response = await axios.post('/api/ShowData', { endPoint, id });
        console.log(`${endPoint} data is: ${response.data}`);
        setData(response.data);
      } catch (error: any) {
        console.error('Error encountered:', error);
        toast.error('Error encountered during data fetch: ' + error.message);
      }
    };

    showDetails();
  }, [endPoint, id, setData]);
};

export default useShowDataHelper;
