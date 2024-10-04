import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { User } from "../../../types/user";
import Link from "next/link";
import DataLoader from '@/components/Shared/Loaders/Loader';
import { fadeIn } from '@/Utils/motion';
import { getButtonColor, getCardColor, getIcon, getTextColor } from '@/helpers/SubjectDisplayHelper';
import UnregisteredSubjects from '@/components/Shared/Errors/UnregisteredSubjects';
import UnregisteredStatus from '@/components/Shared/Errors/UnregisteredStatus';

interface SubjectData {
  subject_id: number;
  subject_name: string;
  description: string;
  code: string;
  credits: number;
  icon: React.ReactNode;
  cardColor: string;
  textColor: string;
  buttonColor: string;
}

interface CalendarData {
  id: number;
  name: string | null;
  start_date: string;
  end_date: string;
  description: string;
  is_active: number;
  term_id: number;
  created_at: string;
  updated_at: string;
  term_name: string | null;
}


interface SubjectsProps {
  user: User;
}

const fadeInVariants = fadeIn({
  direction: 'up',
  type: 'spring',
  delay: 1.5,
  duration: 1.25,
});

const AvailableSubjects: React.FC<SubjectsProps> = ({ user }) => {
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSubjects, setHasSubjects] = useState<boolean>(true);
  const [subjectId, setSubjectId] = useState<number>(0);
  const [calendars, setCalendars] = useState<CalendarData | null >(null);
  const [canRegister, setCanRegister] = useState<boolean>(true); // To track registration status
  const [amountNeeded, setAmountNeeded] = useState<number>(0);   // To track amount needed

  const endPoint = 'students'; 

  let displayName = 'User';
  let studentId = 0;
  let classId = 0;

  if ('student' in user) {
    displayName = `${user.student.first_name} ${user.student.last_name}`;
    studentId = user.student.id;
    classId = user.student.class_id;
  }

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const response = await axios.post(`/api/GetData`, {
          endPoint: 'academic/terms/active',
        });
        if (response.status === 200 && response.data.term) {
          const { term } = response.data;
          setCalendars(term); // Set the term data including term_id
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCalendars();
  }, [endPoint]);
  

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.post(`/api/getStudentSubjects`, {
          id: studentId,
          endPoint: endPoint,
        });

        if (Array.isArray(response.data.subjects)) {
          const subjects = response.data.subjects.map((subject: any) => ({
            subject_id: subject.id,
            subject_name: subject.name,
            description: subject.description,
            code: subject.code,
            credits: subject.credits,
            icon: getIcon(subject.name),
            cardColor: getCardColor(subject.name),
            textColor: getTextColor(subject.name),
            buttonColor: getButtonColor(subject.name),
          }));
          setSubjectData(subjects);
          setSubjectId(subjects[0]?.subject_id || 0);
          setHasSubjects(subjects.length > 0);
        } else {
          setHasSubjects(false);
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        setHasSubjects(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [endPoint, studentId]);

  useEffect(() => {
    const canStudentRegister = async () => {
      if (!calendars) return; // Ensure calendars are loaded
  
      const { term_id } = calendars; // Extract the term_id from the calendar data
  
      try {
        const response = await axios.post(`/api/CanRegister`, {
          endPoint: endPoint,
          data: {
            term_id: term_id,   // Use the retrieved term_id
            class_id: classId,
          },
          studentId: studentId,
        });
  
        if (response.status === 200 && response.data.decision) {
          if (typeof response.data.decision === 'boolean' && response.data.decision === true) {
            setCanRegister(true);  // Allow registration
          } else if (typeof response.data.decision === 'object') {
            const { can_register, amount_needed } = response.data.decision;
            setCanRegister(can_register);
            setAmountNeeded(amount_needed);
          }
        }
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    canStudentRegister();
  }, [calendars, classId, endPoint, studentId]);
  
  

  if (loading) return <div><DataLoader /></div>;
  if (error) return <div>Error: {error}</div>;

  // Render UnregisteredStatus if registration is blocked
  if (!canRegister) return <UnregisteredStatus amountNeeded={amountNeeded} />;

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center">
        <h1 className='font-bold text-2xl text-primary'>Subject Registration</h1>
      </div>
      <section className="m-4 grid gap-8 p-8 md:grid-cols-3">
        {subjectData.map((subject) => (
          <motion.div
            whileHover={{
              scale: 1.1,
              textShadow: '0px 0px 8px rgb(255,255,255)',
              boxShadow: '0px 0px 8px rgb(255,255,255)',
            }}
            key={subject.subject_id}
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
              <p className={`mt-4 ${subject.textColor}`}>Credits: {subject.credits}</p>
              <div className="card-actions mt-5 justify-end">
                <Link href={`/Student/subjects/Enroll/${subject.subject_id}`}>
                  <button className={`rounded-sm px-4 py-2 ${subject.buttonColor} text-white`}>
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

export default AvailableSubjects;
