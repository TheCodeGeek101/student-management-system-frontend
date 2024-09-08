import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from "../../public/images/logo.png";

const page: React.FC = () => {
    return (
        <section className="bg-white">
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                    <Image
                        width={150}
                        height={80}
                        src={logo}
                        alt="Logo"
                        className="flex justify-center items-center ml-10"
                        priority
                    />
                    <h1 className="mt-3 text-2xl font-semibold text-primary md:text-3xl">
                        Access Denied
                    </h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        We regret to inform you that you have been withdrawn from the school due to academic performance issues. As a result, you no longer have access to the system and its resources.
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        If you believe this is a mistake or if you have any questions, please contact the school management for further assistance and clarification. We are here to help you through the process and provide any necessary support.
                    </p>

                    <div className="flex items-center justify-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 rtl:rotate-180"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                />
                            </svg>
                            <Link href='/'>
                                <span>Go back</span>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;
