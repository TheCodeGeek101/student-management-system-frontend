import CreateTutor from '@/components/Adminstrator/tutors/CreateTutor';
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
