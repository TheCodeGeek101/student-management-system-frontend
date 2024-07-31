// Import User types
import Loader from '@/components/Shared/Loader';
import { User } from '../types/user'; // Adjust path as needed
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const GetLoggedInUserHelper = (): User | undefined => {
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
         <Loader/>; // Show loading component while fetching user
    }
    
    return loggedInUser;
}

export default GetLoggedInUserHelper;
