
// app/admin/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import AdminDashboard from '@/components/Adminstrator/Dashboard/dashboard';
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { withIronSession, SessionOptions } from '@daiyam/next-iron-session';



const Dashboard = () => {
    return (
        <>
        <DefaultLayout>
            <AdminDashboard/>
        </DefaultLayout>
        </>
    );
}

 

export default Dashboard;
