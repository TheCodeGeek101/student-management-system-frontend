'use client';
import React from 'react';
import DefaultLayout from "../../../../components/Layouts/DefaultLayout";
import GetLoggedInUserHelper from "../../../../helpers/GetLoggedInUserHelper";
import VerifyTransaction from "../../../../components/Students/Payments/VerifyTransaction";
import Loader from '../../../../components/Shared/Loader';
import { useRouter } from 'next/router';

const Page = () => {
  const user = GetLoggedInUserHelper();
   const router = useRouter();
  // Destructure `id` from query parameters
  const { tx_ref } = router.query;

  // Ensure `id` is a string
  const txRef = Array.isArray(tx_ref) ? tx_ref[0] : tx_ref || '';
  
  // Convert `txRef` to a number
  const txRefNumber = Number(txRef);
  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <VerifyTransaction tx_ref={txRef} user={user}  />
      </DefaultLayout>
    )
  );
};

export default Page;
