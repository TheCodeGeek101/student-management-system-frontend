'use client';
import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/Shared/PageWrapper";
import axios from "axios";
import { User } from "@/types/user";

interface SubjectData {
  subject_name: string;
  description: string;
  code: string;
  credits: number;
  department_name:string;
  class_name:string;
}

interface AllocatedSubjectsProps {
  user: User;
}

const AllocatedSubjects: React.FC<AllocatedSubjectsProps> = ({ user }) => {
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const endPoint = 'tutors'; // Update endpoint to match new data type

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
        const response = await axios.post(`/api/getTutorSubjects`, { id:id, endPoint:endPoint });
        const subjects = response.data.subjects.map((subject: any) => ({
          subject_name: subject.name,
          description: subject.description,
          code: subject.code,
          department_name:subject.department_name,
          class_name:subject.class_name,
          credits: subject.credits,
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    // <PageWrapper>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-center">
          <h1 className="font-bold text-2xl text-primary p-5 mb-5">Subject Allocation</h1>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-primary text-left ">
              <th className="min-w-[220px] px-4 py-4 font-medium text-white xl:pl-11">
                Subject Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-white ">
                Description
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-white ">
                Code
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-white ">
                Department
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-white ">
                Class
              </th>
              <th className="px-4 py-4 font-medium text-white">
                Credits
              </th>
            </tr>
          </thead>
          <tbody>
            {subjectData.map((data, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
                  <h5 className="font-medium text-black ">
                    {data.subject_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 ">
                  <p className="text-black ">
                    {data.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 ">
                  <p className="text-black ">
                    {data.code}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 ">
                  <p className="text-black ">
                    {data.department_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 ">
                  <p className="text-black ">
                    {data.class_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 ">
                  <p className="text-black ">
                    {data.credits}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // </PageWrapper>
  );
}

export default AllocatedSubjects;
