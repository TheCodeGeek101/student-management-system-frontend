'use client';
import React from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Loader from '@/components/Shared/Loader';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import ShowWithdrawnStudent from '@/components/Adminstrator/students/showWithdrawnStudent';

const Page = () => {
  const user = GetLoggedInUserHelper();
   const router = useRouter();
  // Destructure `id` from query parameters
  const { id } = router.query;

  // Ensure `id` is a string
  const studentId = Array.isArray(id) ? id[0] : id || '';
  
  // Convert `studentId` to a number
  const studentIdNumber = Number(studentId);
  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <ShowWithdrawnStudent studentId={studentIdNumber} />
      </DefaultLayout>
    )
  );
};

export default Page;
