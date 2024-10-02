import React from 'react';
import Image from 'next/image';
import logo from "../../../public/images/logo.png";
import Link from 'next/link';

const ServerError: React.FC = () => {
    return (
        <section className="">
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                    {/* <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>
                    </p> */}
                    <Image
                        width={150}
                        height={80}
                        src={logo}
                        alt="Logo"
                        className="flex justify-center items-center ml-10"
                        priority
                        />
                    <h1 className="mt-3 text-2xl font-semibold text-gray-600 dark:text-white md:text-3xl">
                        Internal Server Error
                    </h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        It looks like we are having problems connecting to the server.
                         Please bare with us as the problem is under investigation.
                    </p>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        We apologize for the inconvenience this issue has caused.
                         Please check back later or contact the administration for more information.
                    </p>

                </div>
            </div>
        </section>
    );
};

export default ServerError;
