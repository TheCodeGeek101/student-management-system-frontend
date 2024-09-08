import React, { useState, useEffect } from 'react';
import { 
    FaBook, 
    FaFlask, 
    FaAtom,
    FaSeedling,
    FaMicroscope,
    FaGlobe,
    FaLandmark,
    FaLanguage,
    FaHeart,
    FaGraduationCap
 } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '@/Utils/motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { User } from '@/types/user';
import DataLoader from '@/components/Shared/Loaders/Loader';
import { getButtonColor, getCardColor, getIcon, getTextColor } from '@/helpers/SubjectDisplayHelper';

interface Subject {
  subject_id: number;
  name: string;
  code: string;
  description: string;
  credits: number;
  class_name: string;
  department_name: string;
}

interface SelectionProps {
  subject_id: number;
  user: User;
}

const fadeInVariants = fadeIn({
  direction: 'up',
  type: 'spring',
  delay: 1.5,
  duration: 1.25,
});


const EnrollSubject: React.FC<SelectionProps> = ({ subject_id, user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [subjectData, setSubjectData] = useState<Subject | null>(null);
  const subjectEndpoint = "subjects/show";
  const endPoint = 'students';

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.post(`/api/ShowData`, {
          endPoint: subjectEndpoint,
          id: subject_id
        });
        if (response.status === 200) {
          setSubjectData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching subject data');
        setLoading(false);
      }
    };
    fetchSubjectData();
  }, [subject_id]);

  let displayName = 'User';
  let studentId = 0;
  let class_id = 0;

  if ('student' in user) {
    displayName = `${user.student.first_name} ${user.student.last_name}`;
    studentId = user.student.id;
    class_id = user.student.class_id;
  }

  const onSubmit = async () => {
    setIsLoading(true);
    console.log('Enrolling student:', studentId, 'to subject:', subject_id);

    const data = {
      subject_id: subject_id,
      class_id:class_id
    };

    try {
      const response = await axios.post('/api/enrollSubject', {
        endPoint: endPoint,
        studentId: studentId,
        data: data,
      });

      if (response.status === 200) {
        toast.success('Subject enrolled successfully!');
      }
    } catch (error: any) {
      console.error('Submission error:', error);

      if (error.response) {
        if (error.response.status === 409) {
          toast.error(error.response.data.message || 'Student already enrolled in this subject');
        } else {
          toast.error(`Failed to enroll: ${error.response.data.error || error.message}`);
        }
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error('Error encountered: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
        className={`w-full max-w-lg p-8 rounded-lg shadow-lg ${subjectData ? getCardColor(subjectData.name) : 'bg-white'}`}
      >
        {loading ? (
          <DataLoader />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          subjectData && (
            <div className="flex flex-col items-center">
              <div className={`w-full h-full mb-4 rounded-full flex justify-center items-center bg-gray-100 ${subjectData ? getCardColor(subjectData.name) : ''}`}>
                <div>
                {getIcon(subjectData.name)}
            
                </div>
            
              </div>
              <h2 className={`text-2xl font-bold ${subjectData ? getTextColor(subjectData.name) : 'text-gray-800'} mb-2`}>
                {subjectData.name}
              </h2>
             
              <p className={`flex text-center p-3 mb-4 font-bold  text-2xl ${subjectData ? getTextColor(subjectData.name) : 'text-gray-700'}`}>
                {subjectData.description}
              </p>
              <div className={`w-full bg-gray-50 p-4 rounded-lg shadow-sm mb-4 ${subjectData ? getCardColor(subjectData.name) : 'bg-white'}`}>
                 
                <p className={`text-sm mb-2 ${subjectData ? getTextColor(subjectData.name) : 'text-gray-500'}`}>
                  <strong>Class</strong>: <span>{subjectData.class_name}</span>
                </p>
                <p className={`text-sm mb-2 ${subjectData ? getTextColor(subjectData.name) : 'text-gray-500'}`}>
                  <strong>Code</strong>: <span>{subjectData.code}</span>
                </p>
                <p className={`text-sm mb-2 ${subjectData ? getTextColor(subjectData.name) : 'text-gray-500'}`}>
                  <strong>Credits</strong>: <span>{subjectData.credits}</span>
                </p>
                <p className={`text-sm mb-2 ${subjectData ? getTextColor(subjectData.name) : 'text-gray-500'}`}>
                  <strong>Department</strong>: <span>{subjectData.department_name}</span>
                </p>
              </div>
              <button
                onClick={() => onSubmit()}
                className={`px-4 py-2 w-full text-white rounded-lg hover:bg-opacity-75 focus:outline-none focus:ring-2 ${subjectData ? getButtonColor(subjectData.name) : 'bg-blue-500'} ${isLoading ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Enrolling...' : 'Enroll'}
              </button>
            </div> 
          )
        )}
        <Toaster position="top-center" />
      </motion.div>
    </div>
  );
};

export default EnrollSubject;