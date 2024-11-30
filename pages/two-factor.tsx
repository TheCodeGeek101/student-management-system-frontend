'use client';
import React, { useState, useContext } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/AuthContext';

type Errors = {
    [key: string]: string;
};

const TwoFactor: React.FC = () => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const endPoint = 'auth';
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ two_factor_code: string }>({ two_factor_code: '' });
    const [errors, setErrors] = useState<Errors>({});
    const name = 'two_factor_code';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('code:' + formData.two_factor_code);
            const response = await axios.post(`/api/verifyOtp`, {
                endPoint: endPoint,
                data: formData.two_factor_code
            });

            if (response.status === 200) {
                if (user?.role === 'superadmin') {
                    router.push('/Admin/dashboard/page');
                } else if (user?.role === 'admin') {
                    if ('admin' in user) {
                        const { position } = user;
                        switch (position) {
                            case "Bursar":
                                router.push('/Admin/bursar/dashboard/page');
                                break;
                            case "Assistant Bursar":
                                router.push('/Admin/bursar/dashboard/page');
                                break;
                            case "Secretary":
                                router.push('/Admin/secretary/dashboard/page');
                                break;
                            case "It Officer":
                                router.push('/Admin/it-officer/dashboard/page');
                                break;
                            case "Head Teacher":
                                router.push('/Admin/dashboard/page');
                                break;
                            case "Deputy Head Teacher":
                                router.push('/Admin/dashboard/page');
                                break;
                            default:
                                router.push('/Admin/bursar/dashboard/page');
                                break;
                        }
                    }
                } else if (user?.role === 'student') {
                    router.push('/Student/dashboard/page');
                } else if (user?.role === 'tutor') {
                    router.push('/Tutors/dashboard/page');
                }
            } else {
                setErrors({ otp: 'Invalid OTP code. Please try again.' });
            }
        } catch (error) {
            console.error("Error verifying OTP", error);
            setErrors({ otp: 'Error verifying OTP. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="bg-gray-100 min-h-screen">
                <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
                    <div className="w-full max-w-md mx-auto mt-6">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                                    Please enter the OTP sent to your email address
                                </label>
                                <input
                                    type="number"
                                    name={name}
                                    value={formData.two_factor_code}
                                    onChange={handleChange}
                                    placeholder="One-time password"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                {errors.otp && (
                                    <p className="mt-2 text-sm text-red">{errors.otp}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className={`w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'
                                }`}
                                disabled={loading}
                            >
                                {loading ? 'Verifying...' : 'Verify'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TwoFactor;
