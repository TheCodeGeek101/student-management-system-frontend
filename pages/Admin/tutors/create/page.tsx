import CreateTutor from '@/components/admin/tutors/CreateTutor';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React from 'react';

const Page = () => {
    return (
       <>
        <DefaultLayout>
            <CreateTutor/>
        </DefaultLayout>
       </>
    );
}

export default Page;
