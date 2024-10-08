import React, { useState, useEffect } from 'react';
import useShowDataHelper from '@/helpers/ShowDataHelper';
import { formatDateToWords } from '@/utils/DateFormat';
import { dropIn } from '../../../Utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../../public/images/logo.png';

interface Tutor {
  tutor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: string;
  department_name: string;
  bio: string;
}

interface ShowTutorProps {
  setShowTutorModal: (show: boolean) => void;
  id: number;
}

const ShowTutor: React.FC<ShowTutorProps> = ({ setShowTutorModal, id }) => {
  const [tutorData, setTutorData] = useState<Tutor | null>(null);
  const endpoint = "tutors/show";

  // Use the custom hook to fetch data
  useShowDataHelper<Tutor>(endpoint, id, setTutorData);

  // Display loading text until the data is fetched
  if (!tutorData) {
    toast('Loading tutor data...', { duration: 1500 });
    return null;
  }

  // Tutor Details UI
  return (
    <>
      <div
        onClick={() => {
          setShowTutorModal(false);
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 p-4 backdrop-blur-lg"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          drag={false}
          variants={dropIn}
          className="relative mx-auto mt-20 max-h-[80vh] min-h-fit w-full max-w-3xl overflow-auto rounded-2xl bg-white p-6 shadow-xl md:w-4/6"
        >
          <div className="flex justify-between">
            <div></div>
            <button
              onClick={() => {
                setShowTutorModal(false);
              }}
              className="text-4xl text-primary"
            >
              &times;
            </button>
          </div>
          <div className="flex justify-center p-5">
            <Image
              src={logo}
              className="ease-nav-brand flex text-center transition-all duration-200 dark:hidden"
              alt="main_logo"
              width={150}
              height={150}
            />
          </div>
          <h2 className="mb-4 flex justify-center text-xl font-bold text-[#0ea5e9]">
            Tutor Details
          </h2>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                First Name:
              </strong>{' '}
              {tutorData.first_name}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Last Name:
              </strong>{' '}
              {tutorData.last_name}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Email:
              </strong>{' '}
              {tutorData.email}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Phone:
              </strong>{' '}
              {tutorData.phone}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Hire Date:
              </strong>{' '}
              {formatDateToWords(tutorData.hire_date)}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Department:
              </strong>{' '}
              {tutorData.department_name}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Bio:
              </strong>{' '}
              {tutorData.bio}
            </li>
          </ul>

          <div className="container bottom-1 mb-4 mt-4 flex justify-center">
            <button
              onClick={() => {
                setShowTutorModal(false);
              }}
              className="border-slate-300 text-slate-400 w-28 cursor-pointer rounded-[5px] border-2 bg-white p-1 py-2 font-semibold uppercase transition duration-200 ease-in-out hover:bg-opacity-50 hover:text-primary md:w-40"
            >
              Close
            </button>
          </div>
        </motion.div>
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default ShowTutor;
