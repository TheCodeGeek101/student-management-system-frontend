import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { calendarFields } from '@/Utils/fields';
import { createInitialFormState, validateForm } from "../../../hooks/FormConfigHelper";
import Link from 'next/link';
import { User } from '@/types/user';
import { useRouter } from 'next/router';

type Option = {
    value: string;
    label: string;
};

type Field = {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    options?: Option[];
    required?: boolean;
};

type FormData = {
    [key: string]: string;
};

type Errors = {
    [key: string]: string;
};

interface AdminProps {
  user: User;
}

const CreateCalendar: React.FC<AdminProps> = ({user}) => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const endpoint = "academic/calendars/create";
    const [formData, setFormData] = useState(createInitialFormState(calendarFields));
    const [errors, setErrors] = useState<Errors>({});
    const router = useRouter();


    let displayName = "User";
    let adminId = 0;
 
  if ("admin" in user) {
    displayName = `${user.admin.full_name}`;
    adminId = user.admin.id;
  }


    const handleChange = (e: 
        React.ChangeEvent<HTMLInputElement | 
        HTMLSelectElement |
         HTMLTextAreaElement>, 
         name: string) => {
        const { value } = e.target;

        setFormData((prevFormData:any) => ({
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        // Validate form data
        const validationErrors: any = validateForm(calendarFields, formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }
    
        console.log("Form data:", JSON.stringify(formData));
        try {
            setIsLoading(true);
            
            // Post the form data to the API
            const response = await axios.post('/api/PostAcademicTerm', {
                endPoint: endpoint,
                data: formData,
            });
    
            // Handle successful responses
            if (response.status === 200 || response.status === 201) {
                toast.success("Record created successfully");
                setFormData(createInitialFormState(calendarFields)); // Reset form data
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            
            // Handle errors
            if (error.response) {
                // Handle specific status codes from the server
                if (error.response.status === 409) {
                    toast.error(error.response.data.message || 'A term in the calendar already exists within the specified dates.');
                } else if (error.response.status === 500) {
                    toast.error('Server error occurred');
                } else {
                    toast.error('Operation Failed: ' + (error.response.data.error || 'Unknown error'));
                }
            } else if (error.request) {
                // No response received from the server
                toast.error('No response from server');
            } else {
                // Some other error occurred
                toast.error('Error encountered: ' + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center p-12">
            <div className="container mx-auto">
                <div className="flex justify-center w-full max-w-2xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-full py-16 px-12 bg-white">
                        {/* <h2 className="text-3xl mb-4 text-secondary text-center">Register</h2> */}
                        <p className="mb-4 text-center font-semibold text-2xl">Create Calendar</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {(calendarFields || []).map((field, index) => (
                                    <div key={index} className="w-full">
                                        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-600">
                                            {field.label}
                                        </div>
                                    
                                            <div>
                                              
                                              {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof Tutor]}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLTextAreaElement>, field.name)}
                        className="border border-gray-400 rounded-md  py-2 px-4 w-96 h-32"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name as keyof Tutor]}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLSelectElement>, field.name)}
                        className="border border-gray-400 rounded-md py-2 px-4 w-full"
                        required
                      >
                        <option value="" disabled>{field.placeholder}</option> {/* Placeholder for select */}
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
                        value={formData[field.name as keyof Tutor]}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>, field.name)}
                        className="border rounded-md border-gray-400 py-2 px-4 w-full"
                        required
                      />
                    )}
                                                {errors[field.name] && (
                                                    <p className="text-danger text-sm mt-1">{errors[field.name]}</p>
                                                )}
                                            </div>
                                        
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex justify-around">
                  <Link href='/Admin/secretary/dashboard/page'>

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
                      <span>Go Back</span>
                </button>
                </Link>
                
                <button
                  type='submit'
                  className={`w-28 py-2 font-semibold uppercase transition ${
                      loading
                      ? 'cursor-not-allowed bg-primary text-white opacity-70'
                      : 'bg-primary text-white hover:border-2 hover:bg-white hover:text-primary'
                  } md:w-40`}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>

                        </form>
                    </div>
                </div>
                <Toaster position='top-center'/>
            </div>
        </div>
    );
}

export default CreateCalendar;
