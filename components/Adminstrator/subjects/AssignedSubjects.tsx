'use client';
import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/Shared/PageWrapper";
import axios from "axios";

interface SubjectData {
  tutor_first_name: string;
  tutor_last_name: string;
  assigned_by: string;
  subject_name: string;
  subject_code: string;
  department_name:string;
  class_name:string;
}

const AssignedSubjects: React.FC = () => {
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const endPoint = 'subjects/tutors'; // Update endpoint to match new data type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/GetData`, { endPoint });
        // console.log('Response data is:', JSON.stringify(response.data.subjects));
        setSubjectData(response.data.subjects); // Assuming response data is the final data we need
      } catch (error: any) {
        setError(error.response?.statusText || error.message);
        // console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endPoint]);

  if (error) {
    console.log(error);
  }

  return (
    // <PageWrapper>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default  sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="flex justify-center">
            <h1 className="font-bold text-2xl text-primary p-5 mb-5">Teacher Subject Allocation</h1>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-primary text-left ">
                <th className="min-w-[220px] px-4 py-4 font-medium text-white  xl:pl-11">
                  First name
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-white ">
                  Last Name
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-white ">
                  Department
                </th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-white ">
                  Subject
                </th> 
                <th className="min-w-[120px] px-4 py-4 font-medium text-white ">
                  Code
                </th> 
                <th className="min-w-[120px] px-4 py-4 font-medium text-white ">
                  Class
                </th>
                <th className="px-4 py-4 font-medium text-white">
                  Allocated by
                </th>
              </tr>
            </thead>
            <tbody>
              {subjectData.map((data, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 xl:pl-11">
                    <h5 className="font-medium text-black ">
                      {data.tutor_first_name}
                    </h5>
                    
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 ">
                    <p className="text-black ">
                    {data.tutor_last_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 ">
                    <p className="text-black ">
                      {data.department_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 ">
                    <p className="text-black ">
                      {data.subject_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 ">
                    <p className="text-black ">
                      {data.subject_code}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 ">
                    <p className="text-black ">
                      {data.class_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 ">
                    <p className="text-black ">
                      {data.assigned_by}
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

export default AssignedSubjects;
