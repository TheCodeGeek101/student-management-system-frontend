import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { useRouter } from 'next/router';
import EditTutor from '@/components/Adminstrator/tutors/EditTutor';

const Page: React.FC = () => {
    const router = useRouter();
    // Destructure `id` from query parameters
    const { id } = router.query;
    
    // Ensure `id` is a string
    const tutorId = Array.isArray(id) ? id[0] : id || '';

    return (
        <DefaultLayout>
          <EditTutor tutorId={tutorId}/>
        </DefaultLayout>
    );
};

export default Page;
