'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import logo from "../public/images/logo.png";

const UnauthorisedPage = () => {
  const router = useRouter();

  // Redirect to home page after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        exit={{ y: -1000 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-7 p-4 text-center"
      >
        <Image src={logo} alt="401" width={200} height={200} />
        <h1 className="text-4xl font-bold text-primary">Access Denied</h1>
        <p className="text-gray-700">
          Unfortunately, you do not have permission to view this page. Please
          ensure you are logged in with the appropriate credentials. If you
          believe you are receiving this message in error, please contact our
          support team for assistance or try logging in again.
        </p>
        <div className="container bottom-1 mb-4 mt-4 flex justify-around">
          <button
            onClick={() => {
              // setCreateClientOpen(false);
            }}
            className={`border-slate-300 text-slate-400 w-28 cursor-pointer rounded-[5px] border-2 bg-white p-1 py-2 font-semibold uppercase transition duration-200 ease-in-out hover:bg-[#d03434] hover:text-white md:w-40`}
          >
            Back
          </button>
          <button
            className={`hover:text-[#d03434]' w-28 cursor-not-allowed bg-primary bg-primary             
                      py-2 font-semibold uppercase text-white text-white opacity-70 transition hover:border-2 hover:bg-opacity-50
                   md:w-40`}
          >
            Learn more
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UnauthorisedPage;
