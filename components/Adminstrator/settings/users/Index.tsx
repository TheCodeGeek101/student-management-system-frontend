import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from "next/link";

interface CardDetail {
  title: string;
  description: string;
  name: string;
  link:string;
}

export default function UserManagement() {

  const cardDetails: CardDetail[] = [
    {
      title: 'Create Adminstrators',
      description: 'Click here to register new adminstrators with the specified position',
      name: 'create',
      link:'/Admin/settings/Usermanagement/admin/Create'
    },
    {
      title: 'View Adminstrators',
      description: 'Click here to view the adminstrators details',
      name: 'view',
      link: '/Admin/settings/Usermanagement/admin/Adminstrators'
    },
   
  ];

 

  return (
    <>
    <div className='h-screen'>
        <section className="m-4 grid gap-8 p-8 md:grid-cols-3 ">
        {cardDetails.map((detail) => (
          <motion.div
            whileHover={{
              scale: 1.1,
              textShadow: '0px 0px 8px rgb(255,255,255)',
              boxShadow: '0px 0px 8px rgb(255,255,255)',
            }}
            key={detail.name}
            className="card text-white  mx-auto block rounded-lg border border-primary bg-primary p-10 transition duration-200 "
          >
            <div className="card-body">
              <h2 className="flex items-center font-bold capitalize">
                {detail.title}
              </h2>
              <p className="mt-4 text-white">{detail.description}</p>
              <div className="card-actions mt-5 justify-end">
               <Link href={`${detail.link}`}>               
                <button
                  id={detail.name}
                  className="mr-4 transform rounded-sm bg-white/20 px-2 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-opacity-50 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                  View
                </button>
               </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
    </>
  );
}
