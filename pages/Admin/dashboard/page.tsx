// Dashboard.tsx
'use client';
import React, { useState, useEffect } from "react";
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import AdminDashboard from '@/components/Adminstrator/Dashboard/dashboard';
import { Toaster } from "react-hot-toast";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/Shared/Loader";

interface UserBase {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    password: string;
    role: string;
    status: string;
    remember_token: string | null;
    created_at: string;
    updated_at: string;
}

interface Student extends UserBase {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    address: string;
    postal_address: string;
    gender: string;
    guardian_name: string;
    guardian_contact: string;
    phone_number: string;
    admission_date: string;
    previous_school: string;
    emergency_contact: string;
    medical_info: string;
    enrollment_status: string;
    user_id: number;
    registered_by: number;
    remarks: string | null;
    full_name: string;
}

interface Tutor extends UserBase {
    first_name: string;
    last_name: string;
    bio: string;
    phone: string;
    hire_date: string;
    department: string;
    user_id: number;
}

interface Admin extends UserBase {
    full_name: string;
    phone_number: string;
    date_of_birth: string;
    gender: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    profile_picture: string | null;
    employee_id: string;
    position: string;
    department: string;
    date_of_hire: string;
    employment_type: string;
    emergency_contact_name: string;
    emergency_contact_relationship: string | null;
    emergency_contact_phone: string;
    emergency_contact_email: string;
    user_id: number;
    deleted_at: string | null;
}

type User =
    | { student: Student }
    | { tutor: Tutor }
    | { admin: Admin };

// Define the type for the props expected by the Dashboard component
interface DashboardProps {
    user?: User; // Make it optional
}

const Dashboard: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await axios.get('/api/User');

                if (response.status === 200) {
                    setLoggedInUser(response.data);
                } else if (response.status === 500) {
                    toast.error('Failed to retrieve user');
                }
            } catch (error) {
                toast.error('Failed to retrieve user');
            }
        };

        getLoggedInUser();
    }, []);

    if (loggedInUser === undefined) {
        return <Loader/>; // You can replace this with a spinner or loading component
    }

    return (
        <DefaultLayout user={loggedInUser}>
            <AdminDashboard />
            <Toaster position="top-center" />
        </DefaultLayout>
    );
};

export default Dashboard;
