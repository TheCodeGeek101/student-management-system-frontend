'use client';
import { Metadata } from 'next';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import PageWrapper from '@/components/Shared/PageWrapper';
import { useState } from 'react';
import Link from 'next/link';
import { GiPadlock } from 'react-icons/gi';
import { ImEnvelop } from 'react-icons/im';
import { BallTriangle } from 'react-loader-spinner';
import Image from 'next/image';
import logo from '../public/images/logo.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { User } from '../types/user';
import React, { useContext } from 'react';
import { UserContext } from '@/contexts/AuthContext';
interface FormErrors {
  email?: string;
  password?: string;
}

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const {setUser} = useContext(UserContext);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log('API Response:', response.data);

      if (response.status === 200) {
        toast.success(response.data.message || 'Login successful');
        const authenticatedUser: User = response.data.user;
        setUser(response.data.user);
          router.push('/two-factor');
      } else {
        toast.error(response.data.message || 'Unexpected error');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        // Handle 403 error and redirect to forbidden page
        router.push('/Student/Forbidden');
        toast.error('Access forbidden. You have been withdrawn.');
      } else {
        toast.error(error.response?.data.message || 'Unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageWrapper>
        <div className="flex flex-col items-center justify-center w-4/5 min-h-screen py-5 pt-5 mx-4 sm:pt-0 sm:mx-2">
          <main className="flex flex-col items-center justify-center flex-1 w-full px-0 text-center sm:px-20">
            <div className="flex justify-center w-full max-w-4xl bg-white shadow-2xl rounded-2xl sm:w-6/7 sm:flex-row">
              <div className="w-full p-10 sm:w-3/5 sm:p-5">
                <div className="font-bold text-left text-gray-400">
                  <span className="text-mainColor text-[30px]">.</span>
                </div>
                <div className="py-5">
                  <div className="flex justify-center">
                
                  </div>
                  <h2 className="mb-2 text-3xl font-bold text-mainColor">Welcome Back</h2>
                  <div className="inline-block w-10 mb-2 border-2 border-mainColor"></div>
                  <p className="mb-3 text-gray-500">Use your email account</p>
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-col items-center">
                      <div className="flex flex-col w-64 mb-3">
                        <div className="flex items-center rounded-lg border border-mainColor">
                          <ImEnvelop className="m-2 text-gray-400" />
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            className="rounded-lg py-2 px-4 w-full"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div className="flex flex-col w-64 mb-3">
                        <div className="flex items-center rounded-lg border border-mainColor">
                          <GiPadlock className="m-2 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            className="rounded-lg py-2 px-4 w-full"
                          />
                          <button
                            type="button"
                            className="mr-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <button
                          disabled={isLoading}
                          type="submit"
                          className="bg-mainColor hover:bg-darkMainColor text-white font-bold py-2 px-4 rounded-lg"
                        >
                          {isLoading ? ( 
                              <>
                                <BallTriangle height={30} width={30} color="white" /> 
                              </>      
      
                          ) : (
                            'Login'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="hidden w-2/5 bg-mainColor rounded-tr-2xl rounded-br-2xl sm:block"></div>
            </div>
          </main>
        </div>
      </PageWrapper>
      <Toaster />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Home',
};
