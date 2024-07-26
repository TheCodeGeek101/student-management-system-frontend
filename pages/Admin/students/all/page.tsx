import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
// import Students from '@/components/admin/students/Students';4

import Students from '@/components/Adminstrator/students/Students';
const Page = () => {
    return (
        <>
        <DefaultLayout>
            <Students/>
        </DefaultLayout>
        </>
    );  
}

export default Page;
