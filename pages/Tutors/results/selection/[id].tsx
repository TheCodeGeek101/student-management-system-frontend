import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import Loader from '@/components/Shared/Loader';
import { useRouter } from 'next/router';
import CreateAssessment from '@/components/Teachers/assessments/CreateAssessment';
import Selection from '@/components/Teachers/assessments/Section';
import ResultsSelection from '@/components/Teachers/exams/ExamResults';

const Page = () => {
  const user = GetLoggedInUserHelper();
  const router = useRouter();
  // Destructure `id` from query parameters
  const { id } = router.query;

  // Ensure `id` is a string
  const subjectId = Array.isArray(id) ? id[0] : id || '';

  // Convert `subjectId` to a number
  const subjectNumber = Number(subjectId);

  // Show loader while fetching user or render the page once user is fetched
  return (
    user === undefined ? (
      <Loader /> // Handle the case where user is still being fetched
    ) : (
      <DefaultLayout user={user}>
        <ResultsSelection id={subjectNumber}/>
      </DefaultLayout>
    )
  );
};

export default Page;
