import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import { useRouter } from 'next/router';
import ViewExamResults from '@/components/Teachers/exams/ViewExamResults';

const Page = () => {
  const user = GetLoggedInUserHelper();
  const router = useRouter();
  // Destructure `id` from query parameters
  const { id } = router.query;

  // Ensure `id` is a string
  const subjectId = Array.isArray(id) ? id[0] : id || '';

  // Convert `subjectId` to a number
  const subjectIdNumber = Number(subjectId);

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <ViewExamResults subject_id={subjectIdNumber}/>
      </DefaultLayout>
    )
  );
};

export default Page;
