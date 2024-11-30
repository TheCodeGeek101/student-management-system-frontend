'use client';
import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import Timetables from '@/components/Teachers/Timetable/Timetables';

import ViewTimetable from '@/components/Teachers/Timetable/Timetables';
const Page = () => {
  const user = GetLoggedInUserHelper();

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <ViewTimetable user={user}/>
      </DefaultLayout>
    )
  );
};

export default Page;
