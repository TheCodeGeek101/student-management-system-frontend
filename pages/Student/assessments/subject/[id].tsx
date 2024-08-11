import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import { useRouter } from 'next/router';
import CreateAssessment from '@/components/Teachers/assessments/CreateAssessment';
import ShowAssessment from '@/components/Students/assessments/ShowAssessment';

const Page = () => {
  const user = GetLoggedInUserHelper();
  const router = useRouter();
  // Destructure `id` from query parameters
  const { id } = router.query;

  // Ensure `id` is a string
  const assessment_id = Array.isArray(id) ? id[0] : id || '';

  // Convert `assessment_id` to a number
  const assessmentIdNumber = Number(assessment_id);

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <ShowAssessment assessment_id={assessmentIdNumber} user={user}/>
      </DefaultLayout>
    )
  );
};

export default Page;
