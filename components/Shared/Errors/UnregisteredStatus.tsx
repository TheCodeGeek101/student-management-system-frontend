import React from 'react';
import Image from 'next/image';
import logo from "../../../public/images/logo.png";
import Link from 'next/link';

interface UnregisteredSubjectsProps {
  amountNeeded: number; // Prop to receive the amount required from the API
}

const UnregisteredStatus: React.FC<UnregisteredSubjectsProps> = ({ amountNeeded }) => {
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
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
                        Registration Unavailable
                    </h1>
                    <p className="mt-4 text-gray-500">
                        Unfortunately, you are currently unable to register for subjects due to pending financial obligations.
                        To proceed with subject registration, a balance of <span className="font-semibold text-red-500">K{amountNeeded}</span> must be cleared.
                    </p>
                    <p className="mt-2 text-gray-500">
                        Please settle the required amount through our available payment methods to unlock your registration privileges. 
                        Should you need any assistance, do note hesitate to reach out to the <Link href="/support"><span className="text-blue-500 hover:underline">administration</span></Link>.
                    </p>

                    <div className="flex items-center justify-center w-full mt-6 gap-x-3 sm:w-auto">
                        <Link href='/Student/payment-options'>
                            <button className="px-5 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                Make Payment
                            </button>
                        </Link>
                        <Link href='/Student/dashboard/page'>
                            <button className="px-5 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UnregisteredStatus;
