import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { User } from "../../../types/user";
import Link from "next/link";
import DataLoader from '@/components/Shared/Loaders/Loader';
import NoAssessmentsFound from '@/components/Shared/Errors/NoAssessmentsUploaded';
import { FaAtom, FaBook, FaFlask, FaGlobe, FaGraduationCap, FaHeart, FaLandmark, FaLanguage, FaMicroscope, FaSeedling } from "react-icons/fa";

export const getIcon = (subjectName: string) => {
  switch (subjectName.toLowerCase()) {
    case 'mathematics':
      return <FaBook className="text-yellow-500" />;
    case 'additional mathematics':
      return <FaBook className="text-yellow-600" />;
    case 'physics':
      return <FaAtom className="text-blue-500" />;
    case 'agriculture':
      return <FaSeedling className="text-green-500" />;
    case 'chemistry':
      return <FaFlask className="text-purple-500" />;
    case 'biology':
      return <FaMicroscope className="text-green-500" />;
    case 'geography':
      return <FaGlobe className="text-blue-500" />;
    case 'life skills':
      return <FaHeart className="text-red-500" />;
    case 'social studies':
      return <FaLandmark className="text-teal-500" />;
    case 'chichewa':
      return <FaLanguage className="text-orange-500" />;
    case 'english language':
      return <FaGraduationCap className="text-blue-500" />;
      case 'english literature':
      return <FaGraduationCap className="text-blue-500" />;
    case 'history':
      return <FaLandmark className="text-gray-500" />;
    case 'computer studies':
      return <FaAtom className="text-gray-500" />;
    case 'bible knowledge':
      return <FaBook className="text-red-500" />;
    default:
      return <FaBook className="text-green-500" />;
  }
};

export const getCardColor = (subjectName: string) => {
  switch (subjectName.toLowerCase()) {
    case 'mathematics':
      return 'bg-yellow-100';
    case 'additional mathematics':
      return 'bg-yellow-200';
    case 'physics':
      return 'bg-blue-200';
    case 'agriculture':
      return 'bg-green-100';
    case 'chemistry':
      return 'bg-purple-100';
    case 'biology':
      return 'bg-green-200';
    case 'geography':
      return 'bg-blue-200';
    case 'Life Skills':
      return 'bg-red-100';
    case 'social studies':
      return 'bg-teal-100';
    case 'chichewa':
      return 'bg-orange-100';
    case 'chichewa literature':
      return 'bg-orange-200';
    case 'english language':
      return 'bg-blue-200';
    case 'english literature':
      return 'bg-blue-300';
    case 'history':
      return 'bg-orange-200';
    case 'computer studies':
      return 'bg-gray-100';
    case 'bible knowledge':
      return 'bg-red-100';
    default:
      return 'bg-gray-200';
  }
};

export const getTextColor = (subjectName: string) => {
  switch (subjectName.toLowerCase()) {
    case 'mathematics':
      return 'text-yellow-900';
    case 'additional mathematics':
      return 'text-yellow-800';
    case 'physics':
      return 'text-blue-900';
    case 'agriculture':
      return 'text-green-900';
    case 'chemistry':
      return 'text-purple-900';
    case 'biology':
      return 'text-green-800';
    case 'geography':
      return 'text-blue-800';
    case 'life skills':
      return 'text-red-800';
    case 'social studies':
      return 'text-teal-900';
    case 'chichewa literature':
      return 'text-orange-800';
    case 'chichewa':
      return 'text-orange-800';
    case 'english literature':
      return 'text-blue-900';
      case 'english language':
      return 'text-blue-900';
    case 'history':
      return 'text-orange-900';
    case 'computer studies':
      return 'text-gray-900';
    case 'bible knowledge':
      return 'text-red-900';
    default:
      return 'text-gray-900';
  }
};

export const getButtonColor = (subjectName: string) => {
  switch (subjectName.toLowerCase()) {
    case 'mathematics':
      return 'bg-yellow-500';
    case 'additional mathematics':
      return 'bg-yellow-600';
    case 'physics':
      return 'bg-blue-500';
    case 'agriculture':
      return 'bg-green-500';
    case 'chemistry':
      return 'bg-purple-500';
    case 'biology':
      return 'bg-green-600';
    case 'geography':
      return 'bg-blue-600';
    case 'Life Skills':
      return 'bg-blue-200';
    case 'social studies':
      return 'bg-teal-500';
    case 'chichewa ':
      return 'bg-orange-300';
    case 'chichewa literature':
      return 'bg-orange-500';
    case 'english language':
      return 'bg-blue-700';
      case 'english literature':
      return 'bg-blue-700';
    case 'history':
      return 'bg-orange-500';
    case 'computer studies':
      return 'bg-gray-500';
    case 'bible knowledge':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};


interface SubjectData {
  subject_id: number;
  subject_name: string;
  description: string;
  code: string;
  credits: number;
  assessment_id: number;
  icon: React.ReactNode;
  cardColor: string;
  textColor: string;
  buttonColor: string;
}

interface AssessmentsProps {
  user: User;
}

const StudentAssessments: React.FC<AssessmentsProps> = ({ user }) => {
  const [assessmentData, setAssessmentData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAssessments, setHasAssessments] = useState<boolean>(true);
  const endPoint = 'assessments';

  let displayName = 'User';
  let studentId = 0;

  if ('student' in user) {
    displayName = `${user.student.first_name} ${user.student.last_name}`;
    studentId = user.student.id;
  }
  console.log('student id is:::' + studentId);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.post(`/api/getStudentAssessments`, {
        studentId: studentId,
        endPoint: endPoint,
      });
     
      if (response.status === 200 && Array.isArray(response.data.assessments)) {
        const assessments = response.data.assessments.map((subject: any) => ({
          subject_id: subject.subject_id,
          subject_name: subject.subject_name,
          description: subject.subject_description,
          code: subject.subject_code,
          credits: subject.subject_credits,
          assessment_id: subject.assessment_id,
          icon: getIcon(subject.subject_name),
          cardColor: getCardColor(subject.subject_name),
          textColor: getTextColor(subject.subject_name),
          buttonColor: getButtonColor(subject.subject_name),
        }));
        setAssessmentData(assessments);
        console.log("Assessments data :"+ assessmentData);
        setHasAssessments(assessments.length > 0);
      } else {
        setHasAssessments(false);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.response?.statusText || error.message);
      setHasAssessments(false);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [endPoint, studentId]);

  if (loading) return <div><DataLoader /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!hasAssessments) return <NoAssessmentsFound />;

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center">
        {/* <h1 classN</div>ame="text-primary  font-bold text-2xl">View and Manage Your Student Assessments</h1> */}
      </div>
      <section className="m-4 grid gap-8 p-8 md:grid-cols-3">
        {assessmentData.map((subject) => (
          <motion.div
            whileHover={{
              scale: 1.1,
              textShadow: '0px 0px 8px rgb(255,255,255)',
              boxShadow: '0px 0px 8px rgb(255,255,255)',
            }}
            key={subject.assessment_id}
            className={`card mx-auto block rounded-lg p-10 transition duration-200 hover:bg-white/30 ${subject.cardColor}`}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className={`font-bold capitalize ${subject.textColor}`}>
                  {subject.subject_name}
                </h2>
                <span className={`${subject.textColor} text-2xl`}>{subject.icon}</span>
              </div>
              <div className={`flex items-center font-bold capitalize ${subject.textColor}`}>
                {subject.code}
              </div>
              <p className={`mt-4 ${subject.textColor}`}>{subject.description}</p>
              <div className="card-actions mt-5 justify-end">
                <Link href={`/Student/assessments/subject/${subject.assessment_id}`}>
                  <button
                    className={`mr-4 transform rounded-lg p-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-opacity-50 focus:outline-none focus:ring focus:ring-opacity-80 ${subject.buttonColor}`}
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default StudentAssessments;
