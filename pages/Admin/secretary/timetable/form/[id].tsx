'use client';
import React from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Loader from '@/components/Shared/Loader';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import ViewTimetable from '@/components/Secretary/Timetable/ViewTimetable';

const Page = () => {
  const user = GetLoggedInUserHelper();
   const router = useRouter();
  // Destructure `id` from query parameters
  const { class_id } = router.query;

  // Ensure `id` is a string
  const classIdString = Array.isArray(class_id) ? class_id[0] : class_id || '';
  
  // Convert `classIdString` to a number
  const classIdNumber = Number(classIdString);
  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <ViewTimetable class_id={classIdNumber}  />
      </DefaultLayout>
    )
  );
};

export default Page;
