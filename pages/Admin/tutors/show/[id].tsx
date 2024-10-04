'use client';
import React from 'react';
import DefaultLayout from "../../../../components/Layouts/DefaultLayout";
import GetLoggedInUserHelper from "../../../../helpers/GetLoggedInUserHelper";
import Loader from '../../../../components/Shared/Loader';
import { useRouter } from 'next/router';
import ViewTutor from '@/components/Adminstrator/tutors/ViewTutor';
const Page = () => {
  const user = GetLoggedInUserHelper();
   const router = useRouter();
  // Destructure `id` from query parameters
  const { id } = router.query;

  // Ensure `id` is a string
  const tutorId = Array.isArray(id) ? id[0] : id || '';
  
  // Convert `tutorId` to a number
  const tutorIdNumber = Number(tutorId);
  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <ViewTutor tutorId={tutorIdNumber}  />
      </DefaultLayout>
    )
  );
};

export default Page;
