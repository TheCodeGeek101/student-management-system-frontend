import React from 'react';
import Image from 'next/image';
import logo from "../../../public/images/logo.png";
import Link from 'next/link';

const NoExaminationsFound: React.FC = () => {
    return (
        <section className="bg-white ">
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
                        Examination Results Not Yet Uploaded
                    </h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        We apologize for the inconvenience. It appears that the examination results for your subjects have not been uploaded yet. Our team is working to make them available as soon as possible. In the meantime, please feel free to contact your teachers for any updates or check back later.
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
                            <Link href='/Student/dashboard/page'>
                                <span>Go Back</span>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoExaminationsFound;
