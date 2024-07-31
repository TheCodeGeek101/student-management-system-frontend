import React, { useState } from 'react';
import useShowDataHelper from '@/helpers/ShowDataHelper';
import { formatDateToWords } from '@/utils/DateFormat';
import { dropIn } from '../../../Utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../../public/images/logo.png';

interface Department {
  id: number;
  name: string;
  code: string;
  head_of_department: number;
  tutor_first_name:string;
  tutor_last_name:string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ShowDepartmentProps {
  setShowDepartmentModal: (show: boolean) => void;
  id: number;
}

const ShowDepartment: React.FC<ShowDepartmentProps> = ({ setShowDepartmentModal, id }) => {
  const [departmentData, setDepartmentData] = useState<Department | null>(null);
  const endpoint = "department/show"; // Adjust the endpoint as needed

  // Use the custom hook to fetch data
  useShowDataHelper<Department>(endpoint, id, setDepartmentData);

  // Display loading text until the data is fetched
  if (!departmentData) {
    toast('Loading department data...', { duration: 1500 });
    return null;
  }
  const fullname = departmentData.tutor_first_name + departmentData.tutor_last_name

  // Department Details UI
  return (
    <>
      <div
        onClick={() => {
          setShowDepartmentModal(false);
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
                setShowDepartmentModal(false);
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
            Department Details
          </h2>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">ID:</strong> {departmentData.id}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">Name:</strong> {departmentData.name}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">Code:</strong> {departmentData.code}
            </li>
            <li>
              <strong className="px-5 font-bold text-[#0ea5e9]">Head of Department</strong> {fullname}
            </li>
            {/* <li className="col-span-2">
              <strong className="px-5 font-bold text-[#0ea5e9]">Description:</strong> 
              <p className="">
              {departmentData.description}

              </p>
            </li> */}
           
          </ul>

          <div className="container bottom-1 mb-4 mt-4 flex justify-center">
            <button
              onClick={() => {
                setShowDepartmentModal(false);
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

export default ShowDepartment;
