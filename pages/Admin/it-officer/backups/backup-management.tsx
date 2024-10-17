'use client';
import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import AuditIndex from '@/components/ITOfficer/Audit/Index';
import BackupIndex from '@/components/ITOfficer/Backups/Backups';

const Page = () => {
  const user = GetLoggedInUserHelper();

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <BackupIndex/>
      </DefaultLayout>
    )
  );
};

export default Page;
