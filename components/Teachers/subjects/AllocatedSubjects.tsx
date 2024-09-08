'use client';
import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/Shared/PageWrapper";
import axios from "axios";
import { User } from "@/types/user";
import DataLoader from "../../Shared/Loaders/Loader";
import DataNotFound from "@/components/Shared/Errors/UnallocatedSubject";

interface SubjectData {
  subject_name: string;
  description: string;
  code: string;
  credits: number;
  department_name: string;
  class_name: string;
}

interface AllocatedSubjectsProps {
  user: User;
}

const AllocatedSubjects: React.FC<AllocatedSubjectsProps> = ({ user }) => {
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSubjects, setHasSubjects] = useState<boolean>(true);
  const endPoint = 'tutors'; 

  let displayName = 'User';
  let id = 0;

  if ('tutor' in user) {
    displayName = user.tutor.first_name + ' ' + user.tutor.last_name;
    id = user.tutor.id;
    console.log("id is:" + id);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/getTutorSubjects`, { id: id, endPoint: endPoint });

        if (Array.isArray(response.data.subjects)) {
          const subjects = response.data.subjects.map((subject: any) => ({
            subject_name: subject.name,
            description: subject.description,
            code: subject.code,
            department_name: subject.department_name,
            class_name: subject.class_name,
            credits: subject.credits,
          }));
          setSubjectData(subjects);
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

    fetchData();
  }, [endPoint, id]);

  if (loading) {
    return <DataLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hasSubjects) {
    return <DataNotFound />;
  }

  return (
   
    <div className="h-screen">

    <div className="rounded-sm border border-stroke bg-white px-4 pb-2.5 pt-6 shadow-default sm:px-6 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-center">
          <h1 className="font-bold text-xl text-primary p-4 mb-4 sm:text-2xl">
            Subject Allocation
          </h1>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-full table-auto">
            <thead>
              <tr className="bg-primary text-left">
                <th className="px-2 py-2 text-white text-sm sm:text-base">Subject Name</th>
                <th className="px-2 py-2 text-white text-sm sm:text-base">Description</th>
                <th className="px-2 py-2 text-white text-sm sm:text-base">Code</th>
                <th className="px-2 py-2 text-white text-sm sm:text-base">Department</th>
                <th className="px-2 py-2 text-white text-sm sm:text-base">Class</th>
                <th className="px-2 py-2 text-white text-sm sm:text-base">Credits</th>
              </tr>
            </thead>
            <tbody>
              {subjectData.map((data, key) => (
                <tr key={key} className="border-b border-[#eee]">
                  <td className="px-2 py-3 text-sm sm:text-base">{data.subject_name}</td>
                  <td className="px-2 py-3 text-sm sm:text-base">{data.description}</td>
                  <td className="px-2 py-3 text-sm sm:text-base">{data.code}</td>
                  <td className="px-2 py-3 text-sm sm:text-base">{data.department_name}</td>
                  <td className="px-2 py-3 text-sm sm:text-base">{data.class_name}</td>
                  <td className="px-2 py-3 text-sm sm:text-base">{data.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
       
  );
}

export default AllocatedSubjects;
