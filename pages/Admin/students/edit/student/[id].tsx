import React from 'react';
import EditStudent from '@/components/Adminstrator/students/EditStudent';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { useRouter } from 'next/router';

const Page: React.FC = () => {
    const router = useRouter();
    // Destructure `id` from query parameters
    const { id } = router.query;
    
    // Ensure `id` is a string
    const studentId = Array.isArray(id) ? id[0] : id || '';

    return (
        <DefaultLayout>
            <EditStudent studentId={studentId} />
        </DefaultLayout>
    );
};

export default Page;
