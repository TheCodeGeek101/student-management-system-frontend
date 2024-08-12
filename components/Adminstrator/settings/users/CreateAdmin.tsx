"use client";
import React, { useState } from 'react';
import { adminstratorFields } from '@/Utils/fields';
import { createInitialFormState } from '@/hooks/FormConfigHelper';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { validateForm } from '@/hooks/FormConfigHelper';
import Loader from '@/components/Shared/Loader';
import Link from "next/link";

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  options?: { value: string; label: string }[]; 
};

type FormData = {
  [key: string]: string | File | null;
};

type Errors = {
  [key: string]: string;
};

const CreateAdmin: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(false);

  const endpoint = "admin/create";
  const [formData, setFormData] = useState<Adminstrator>(createInitialFormState(adminstratorFields));
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const { value, files }:any = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: any = validateForm(adminstratorFields, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    console.log("Form data:", JSON.stringify(formData));
    try {
      setIsLoading(true);
      const response = await axios.post('/api/post/PostDataApi', {
        endPoint: endpoint,
        data: formData,
      });
      console.log("Response data:", response.data);

      if (response.status === 200) {
        toast.success('Adminstrator created successfully!');
        setFormData(createInitialFormState(adminstratorFields));
      } else {
        const errorMessage = response.data.message || 'An unknown error occurred.';
        toast.error(`Failed to submit tutor data: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      if (error.response) {
        toast.error(`Failed to post to ${endpoint}: ${error.response.data.error || error.message}`);
      } else if (error.request) {
        toast.error('No response from server');
      } else {
        toast.error('Error encountered: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto">
        {/* {loading && <Loader />} */}
        <div className="flex justify-center w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-full py-16 px-12 bg-gray-50">
            <h2 className="text-3xl mb-4 text-center text-mainColor">Register</h2>
            <p className="mb-4 text-center text-gray-50">Create Adminstrator</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {adminstratorFields.map((field) => (
                  <div key={field.name} className={field.type === 'textarea' ? 'col-span-2' : ''}>
                    <label className="block mb-1 text-mainColor">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof Adminstrator] as string}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLTextAreaElement>, field.name)}
                        className="border border-gray-50 py-2 px-4 w-full h-32"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name as keyof Adminstrator] as string}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLSelectElement>, field.name)}
                        className="border border-gray-400 py-2 px-4 w-full"
                        required={field.required}
                      >
                        <option value="" disabled>{field.placeholder}</option>
                        {(field.options ?? []).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={field.type === 'file' ? '' : formData[field.name as keyof Adminstrator] as string}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, field.name)}
                        className="border border-gray-50 py-2 px-4 w-full"
                        required={field.required}
                      />
                    )}
                    {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
                  </div>
                ))}
              </div>
              
               <div className="mt-5 flex justify-around">
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-sm gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
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
                            <Link href='/Admin/settings/Usermanagement/Index'>
                                <span>Go Back</span>
                            </Link>
                        </button>
                    {/* Button to disburse a client */}
                    <button
                         type = 'submit'
                    className={`w-28 py-2 font-semibold uppercase transition ${
                        isloading
                        ? 'cursor-not-allowed bg-primary text-white opacity-70'
                        : 'bg-primary text-white hover:border-2 hover:bg-white hover:text-primary'
                    } md:w-40`}
                    >
                    {isloading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default CreateAdmin;
