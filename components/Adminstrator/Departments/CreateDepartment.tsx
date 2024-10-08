import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { departmentFields } from '@/Utils/fields';
import { createInitialFormState, validateForm } from "../../../hooks/FormConfigHelper";
import Link from 'next/link';

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

interface Props {
    departmentFields: Field[];
    formData: FormData;
    errors: Errors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}

const CreateDepartment: React.FC = () => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const endpoint = "department/create";
    const [formData, setFormData] = useState(createInitialFormState(departmentFields));
    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => {
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
        const validationErrors:any = validateForm(departmentFields, formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        console.log("Form data:", JSON.stringify(formData));
        const data = JSON.stringify(formData);
        try {
            setIsLoading(true);
            const response = await axios.post('/api/post/PostDataApi', {
                endPoint: endpoint,
                data: formData,
            });
            console.log("Response data:", response.data);

            if (response.status === 200) {
                toast.success(`Department created successfully!`);
                setFormData(createInitialFormState(departmentFields));
            } else {
                const errorMessage = response.data.message || 'An unknown error occurred.';
                toast.error(`Failed to submit department data`);
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            if (error.response) {
                toast.error(`Failed to create client: ${error.response.data.error || error.message}`);
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
        <div className="h-screen flex items-center justify-center py-12">
            <div className="container mx-auto">
                <div className="flex justify-center w-full max-w-2xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-full py-16 px-12 bg-white">
                        {/* <h2 className="text-3xl mb-4 text-secondary text-center">Register</h2> */}
                        <p className="mb-4 text-center font-semibold text-2xl">Create Department</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {(departmentFields || []).map((field, index) => (
                                    <div key={index} className="w-full">
                                        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-600">
                                            {field.label}
                                        </div>
                                    
                                            <div>
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => handleChange(e, field.name)}
                                                    className="border border-gray-400 rounded-md py-2 px-4 w-full"
                                                    required
                                                />
                                                {errors[field.name] && (
                                                    <p className="text-danger text-sm mt-1">{errors[field.name]}</p>
                                                )}
                                            </div>
                                        
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

export default CreateDepartment;
