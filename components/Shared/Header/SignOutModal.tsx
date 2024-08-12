"use client";
import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../../public/images/logo.png';
import { dropIn } from '@/Utils/motion';

interface SignOutProps {
  setOpenSignOutModal: (arg0: boolean) => void;
}

const SignOutModal: React.FC<SignOutProps> = ({ setOpenSignOutModal }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    
    setLoading(true);
    try {
      const response = await axios.get('/api/logout');
      if (response.status === 200) {
        // toast.success(response.data.message);
        setTimeout(() => {
          router.push('/');
        }, 1500); // Delay navigation by 2000 milliseconds (2 seconds)
      } else {
        toast.error('failed to sign out user');
      }
    } catch (error: any) {
      console.error('error logging out user:' + error);
      toast.error(error.response?.status);
    } finally {
      setLoading(false);
    }
  };

  //   Show Sign out modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 p-4 backdrop-blur-lg">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={dropIn}
        className="relative mx-auto mt-20 max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-xl md:w-4/6"
      >
        <div className="flex justify-between">
          <div></div>
          <button
            onClick={() => setOpenSignOutModal(false)}
            className="text-4xl text-primary"
          >
            &times;
          </button>
        </div>

        <div className="flex justify-center p-5">
          <Image src={logo} alt="logo" width={150} height={150} />
        </div>
        <div className="p-6 shadow-lg">
          <div className=" mb-5 flex justify-center px-10 py-10 text-xl font-bold text-primary">
            <p>Are you sure you want to Sign out?</p>
          </div>
          <div className="mt-4 flex justify-around">
            <button
              onClick={() => setOpenSignOutModal(false)}
              className="border-slate-300 w-28 cursor-pointer rounded-[5px] border-2 p-1  py-2 font-semibold uppercase text-primary transition duration-200 ease-in-out hover:bg-opacity-50 hover:text-primary md:w-40"
            >
              Close
            </button>
            {/* Button to disburse a client */}
            <button
              onClick={() => handleLogout()}
              className={`w-28 py-2 font-semibold uppercase transition ${
                loading
                  ? 'cursor-not-allowed bg-primary text-white opacity-70'
                  : 'bg-primary text-white hover:border-2 hover:bg-white hover:text-primary'
              } md:w-40`}
            >
              {loading ? 'Signing out...' : 'Confirm'}
            </button>
          </div>
          
        </div>
      </motion.div>

      <Toaster position="top-center" />
    </div>
  );
};

export default SignOutModal;
