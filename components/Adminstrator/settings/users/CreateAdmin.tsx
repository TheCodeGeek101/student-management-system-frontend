"use client";
import React, { useState } from 'react';
import { administratorFields } from '@/Utils/fields';
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

  const endpoint = "tutors/admin/create";
  const [formData, setFormData] = useState<FormData>(createInitialFormState(administratorFields));
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const { value, files }: any = e.target;

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
    const validationErrors: any = validateForm(administratorFields, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    console.log("Form data:", JSON.stringify(formData)); // Ensure formData contains all required fields

    try {
      setIsLoading(true);
      const response = await axios.post('/api/post/PostDataApi', {
        endPoint: endpoint,
        data: formData,
      });
      console.log("Response data:", response.data);

      if (response.status === 200) {
        toast.success('Administrator created successfully!');
        setFormData(createInitialFormState(administratorFields));
      } else {
        const errorMessage = response.data.message || 'An unknown error occurred.';
        toast.error(`Failed to submit data: ${errorMessage}`);
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
        <div className="flex justify-center w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-full py-16 px-12 bg-gray-white">
            <h2 className="text-3xl mb-4 text-center text-gray-600">Register</h2>
            <p className="mb-4 text-center text-gray-400">Create Administrator</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {administratorFields.map((field) => (
                  <div key={field.name} className={field.type === 'textarea' ? 'col-span-2' : ''}>
                    <label className="block mb-1 text-gray-600">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof FormData] as string}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLTextAreaElement>, field.name)}
                        className="border border-gray-400 rounded-md py-2 px-4 w-full h-32"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name as keyof FormData] as string}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLSelectElement>, field.name)}
                        className="border border-gray-400 rounded-md py-2 px-4 w-full"
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
                        value={field.type === 'file' ? '' : formData[field.name as keyof FormData] as string}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, field.name)}
                        className="border border-gray-400 rounded-md py-2 px-4 w-full"
                        required={field.required}
                      />
                    )}
                    {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
                  </div>
                ))}
              </div>
              
              <div className="mt-5 flex justify-around">
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-sm gap-x-2 sm:w-auto  hover:bg-gray-100  dark:border-gray-300">
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
                
                <button
                  type='submit'
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
