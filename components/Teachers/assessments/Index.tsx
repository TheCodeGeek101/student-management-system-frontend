import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { User } from "../../../types/user";
import Link from "next/link";
import DataLoader from '@/components/Shared/Loaders/Loader';
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

interface SubjectData {
  subject_id: number;
  subject_name: string;
  description: string;
  code: string;
  credits: number;
  department_name: string;
  class_name: string;
  icon: React.ReactNode;
  cardColor: string;
  textColor: string;
}

interface AssessmentsProps {
  user: User;
}

const Assessments: React.FC<AssessmentsProps> = ({ user }) => {
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const endPoint = 'tutors';

  let displayName = 'User';
  let id = 0;

  if ('tutor' in user) {
    displayName = `${user.tutor.first_name} ${user.tutor.last_name}`;
    id = user.tutor.id;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/getTutorSubjects`, {
          id: id,
          endPoint: endPoint,
        });
        const subjects = response.data.subjects.map((subject: any) => ({
          subject_id: subject.id,
          subject_name: subject.name,
          description: subject.description,
          code: subject.code,
          department_name: subject.department_name,
          class_name: subject.class_name,
          credits: subject.credits,
          // Add appropriate icon and colors based on subject or department
          icon: getIcon(subject.name),
          cardColor: getCardColor(subject.name),
          textColor: getTextColor(subject.name),
        }));
        setSubjectData(subjects);
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint, id]);

  // Function to determine icon based on subject name
  const getIcon = (subjectName: string) => {
    switch (subjectName.toLowerCase()) {
      case 'mathematics':
        return <FaBook />;
      case 'science':
        return <FaChalkboardTeacher />;
      case 'history':
        return <FaUserGraduate />;
      default:
        return <FaBook className="text-white" />;
    }
  };

  // Function to determine card color based on subject name
  const getCardColor = (subjectName: string) => {
    switch (subjectName.toLowerCase()) {
      case 'mathematics':
        return 'bg-green-300';
      case 'science':
        return 'bg-blue-300';
      case 'history':
        return 'bg-green-300';
      default:
        return 'bg-orange-200';
    }
  };

  // Function to determine text color based on subject name
  const getTextColor = (subjectName: string) => {
    switch (subjectName.toLowerCase()) {
      case 'mathematics':
        return 'text-green-900';
      case 'english':
        return 'text-blue-900';
      case 'history':
        return 'text-yellow-900';
      default:
        return 'text-gray-900';
    }
  };

  if (loading) return <div><DataLoader /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen">
      <section className="m-4 grid gap-8 p-8 md:grid-cols-3">
        {subjectData.map((subject) => (
          <motion.div
            whileHover={{
              scale: 1.1,
              textShadow: '0px 0px 8px rgb(255,255,255)',
              boxShadow: '0px 0px 8px rgb(255,255,255)',
            }}
            key={subject.subject_id}
            className={`card mx-auto block rounded-lg  p-10 transition duration-200 hover:bg-white/30 ${subject.cardColor}`}
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
                <Link href={`/Tutors/assessments/subject/${subject.subject_id}`}>
                  <button
                    className="mr-4 transform rounded-lg bg-green-500 p-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-opacity-50 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
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

export default Assessments;
