import React from 'react';
import Link from 'next/link';
import { FaRegEye, FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '@/Utils/motion';

interface SelectionProps {
  id: number;
}

const fadeInVariants = fadeIn({
  direction: 'up',
  type: 'spring',
  delay: 1.5,
  duration: 1.25,
});

const ResultsSelection: React.FC<SelectionProps> = ({ id }) => {
  return (
    <div className="h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 justify-items-center">
      {/* View Assessments Card */}
      <motion.div 
        variants={fadeInVariants} 
        className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 mx-4"
      >
        <div className="flex flex-col items-center pb-10">
          <div className="w-24 h-24 mb-3 rounded-full flex justify-center items-center bg-primary text-white">
            <FaRegEye size={48} />
          </div>
          <h5 className="mb-1 text-xl font-bold text-primary">View Results</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">Review all student results here.</p>
          <div className="flex mt-4 md:mt-6">
            <Link href={`/Tutors/results/view/${id}`}>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Proceed
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Create Assessment Card */}
      <motion.div 
        className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 mx-4"
      >
        <div className="flex flex-col items-center pb-10">
          <div className="w-24 h-24 mb-3 rounded-full flex justify-center items-center bg-primary text-white">
            <FaPlusCircle size={48} />
          </div>
          <h5 className="mb-1 text-xl font-bold text-primary">Create Results</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add new results for students here.</p>
          <div className="flex mt-4 md:mt-6">
            <Link href={`/Tutors/results/create/${id}`}>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Proceed
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
    </div>
  );
}

export default ResultsSelection;
