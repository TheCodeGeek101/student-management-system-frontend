import React, { useState, useEffect } from 'react';
import useShowDataHelper from '@/helpers/ShowDataHelper';
import { formatDateToWords } from '@/utils/DateFormat';
import { dropIn } from '../../../Utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../../public/images/logo.png';

interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  gender: 'M' | 'F';
  date_of_birth: string; // Ideally, this should be a Date object
  phone_number: string;
  email: string;
  address: string;
  postal_address: string;
  guardian_name: string;
  guardian_contact: string;
  admission_date: string; // Ideally, this should be a Date object
  emergency_contact: string;
  previous_school: string;
  medical_info: string;
}

interface ShowStudentProps {
  setShowStudentModal: (show: boolean) => void;
  id: number;
}

const ShowStudent: React.FC<ShowStudentProps> = ({ setShowStudentModal, id }) => {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const endpoint = "students/show";

  // Use the custom hook to fetch data
  useShowDataHelper<Student>(endpoint, id, setStudentData);

  // Display loading text until the data is fetched
  if (!studentData) {
    toast('Loading student data...', { duration: 1500 });
    return null;
  }

  // Student Details UI
  return (
    <>
      <div
        onClick={() => {
          setShowStudentModal(false);
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
                setShowStudentModal(false);
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
            Student Details
          </h2>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                First Name:
              </strong>{' '}
              {studentData.first_name}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Last Name:
              </strong>{' '}
              {studentData.last_name}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Gender:
              </strong>{' '}
              {studentData.gender}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Birth Date:
              </strong>{' '}
              {formatDateToWords(studentData.date_of_birth)}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Phone Number:
              </strong>{' '}
              {studentData.phone_number}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Email:
              </strong>{' '}
              {studentData.email}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Address:
              </strong>{' '}
              {studentData.address}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Postal Address:
              </strong>{' '}
              {studentData.postal_address}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Guardian Name:
              </strong>{' '}
              {studentData.guardian_name}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Guardian Contact:
              </strong>{' '}
              {studentData.guardian_contact}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Admission Date:
              </strong>{' '}
              {formatDateToWords(studentData.admission_date)}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Emergency Contact:
              </strong>{' '}
              {studentData.emergency_contact}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Previous School:
              </strong>{' '}
              {studentData.previous_school}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">
                Medical Info:
              </strong>{' '}
              {studentData.medical_info}
            </li>
          </ul>

          <div className="container bottom-1 mb-4 mt-4 flex justify-center">
            <button
              onClick={() => {
                setShowStudentModal(false);
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

export default ShowStudent;
