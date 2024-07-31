import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import AssignedSubjects from '@/components/Adminstrator/subjects/AssignedSubjects';


const Page = () => {
  const user = GetLoggedInUserHelper();

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <div className="min-h-screen">
        <AssignedSubjects/>

        </div>
       
      </DefaultLayout>
    )
  );
};

export default Page;
