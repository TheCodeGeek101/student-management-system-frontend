import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import { useRouter } from 'next/router';
import UpdateExaminations from '@/components/Teachers/exams/UpdateExams';


const Page = () => {
  const user = GetLoggedInUserHelper();
  const router = useRouter();
  // Destructure `id` from query parameters
  const { id } = router.query;

  // Ensure `id` is a string
  const assessmentId = Array.isArray(id) ? id[0] : id || '';
  
  // Convert `assessmentId` to a number
  const assessmentIdNumber = Number(assessmentId);
  

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <UpdateExaminations id={assessmentIdNumber}/>
      </DefaultLayout>
    )
  );
};

export default Page;
