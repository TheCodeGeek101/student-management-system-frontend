import Tutors from '@/components/Adminstrator/tutors/Tutors';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React from 'react';

const Page = () => {
    return (
       <>
       <DefaultLayout>
            <Tutors/>
       </DefaultLayout>
       </>
    );
}

export default Page;
