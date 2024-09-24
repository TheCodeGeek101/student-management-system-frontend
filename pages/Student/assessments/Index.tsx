'use client';
import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import AssessmentsIndex from '@/components/Students/assessments/Index';
// import StudentAssessments from '@/components/Students/assessments/subjects';

const Page = () => {
  const user = GetLoggedInUserHelper();

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <AssessmentsIndex user={user}/>
      </DefaultLayout>
    )
  );
};

export default Page;
