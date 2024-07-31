'use client';
import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import { useRouter } from 'next/router';
import EditTutor from '@/components/Adminstrator/tutors/EditTutor';

const Page = () => {
  const user = GetLoggedInUserHelper();
  const router = useRouter();
    // Destructure `id` from query parameters
    const { id } = router.query;

    // Ensure `id` is a string
    const tutorId = Array.isArray(id) ? id[0] : id || '';


  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <EditTutor tutorId={tutorId}/>
      </DefaultLayout>
    )
  );
};

export default Page;





