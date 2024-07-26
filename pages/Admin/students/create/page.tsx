import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import CreateStudent from '@/components/Adminstrator/students/CreateStudent';

const Create = () => {
    return (
        <>
            <DefaultLayout>
                <CreateStudent/>
            </DefaultLayout>
        </>
    );
}

export default Create;
