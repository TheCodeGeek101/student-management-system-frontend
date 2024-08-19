import Loader from '@/components/Shared/Loader';
import { User, Student, Tutor, Admin } from '../types/user'; // Adjust path as needed
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const GetLoggedInUserHelper = (): User | undefined => {
  const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const response = await axios.get('/api/User');

        if (response.status === 200) {
          const userData = response.data;

          // Detect user type and set it along with user data
          if (userData.admin) {
            // Set the role to 'admin' and include the specific admin position
            setLoggedInUser({
              role: 'admin',
              admin: {
                ...userData.admin,
                position: userData.admin.position, // Keep position as part of admin data
              },
            });
          } else if (userData.student) {
            setLoggedInUser({ role: 'student', student: userData.student });
          } else if (userData.tutor) {
            setLoggedInUser({ role: 'teacher', tutor: userData.tutor });
          } else {
            toast.error('Unknown user type');
          }
        } else {
          toast.error('Failed to retrieve user');
        }
      } catch (error) {
        toast.error('Failed to retrieve user');
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    getLoggedInUser();
  }, []);

  if (loading) {
     <Loader />; // Show loading component while fetching user
  }

  return loggedInUser;
};

export default GetLoggedInUserHelper;
