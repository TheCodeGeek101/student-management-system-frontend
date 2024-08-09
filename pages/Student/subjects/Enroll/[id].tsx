import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import { useRouter } from 'next/router';
import EnrollSubject from '@/components/Students/subjects/EnrollSubject';

const Page = () => {
  const user = GetLoggedInUserHelper();
  const router = useRouter();
  // Destructure `id` from query parameters
  const { id } = router.query;

  // Ensure `id` is a string
  const subject_id = Array.isArray(id) ? id[0] : id || '';

  // Convert `subject_id` to a number
  const subjectIdNumber = Number(subject_id);

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <EnrollSubject user={user} subject_id={subjectIdNumber}/>
      </DefaultLayout>
    )
  );
};

export default Page;
