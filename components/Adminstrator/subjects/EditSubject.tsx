import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { subjectFields } from '@/Utils/fields';
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
    subjectId: string;
}

const EditSubject: React.FC<Props> = ({ subjectId }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const endpoint = `subjects/update`;
    const [formData, setFormData] = useState<FormData>(createInitialFormState(subjectFields));
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        const fetchSubjectData = async () => {
            try {
                const response = await axios.post('/api/ShowData', {
                    endPoint: 'subjects/show',
                    id: subjectId
                });

                if (response.status === 200) {
                    setFormData(response.data);
                } else {
                    toast.error('Failed to fetch subject data');
                }
            } catch (error: any) {
                console.error('Error fetching subject data:', error);
                toast.error(`Error fetching subject data: ${error.message}`);
            }
        };

        fetchSubjectData();
    }, [subjectId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => {
        const { value } = e.target;

        setFormData((prevFormData) => ({
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
        setLoading(true);
        const validationErrors: any = validateForm(subjectFields, formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }
        console.log("Form data:", JSON.stringify(formData));

        try {
            const response = await axios.post('/api/UpdateData', {
                endPoint: endpoint,
                formData: formData,
                id: subjectId
            });

            if (response.status === 200) {
                toast.success('Subject updated successfully!');
                setFormData(createInitialFormState(subjectFields));
            } else {
                toast.error(response.data.message || 'An unknown error occurred.');
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            if (error.response) {
                console.error('Response error data:', error.response.data);
                toast.error(`Failed to update subject: ${error.response.data.error || error.message}`);
            } else if (error.request) {
                toast.error('No response from server');
            } else {
                toast.error('Error encountered: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="container mx-auto">
                <div className="flex justify-center w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-full py-16 px-12 bg-gray-50">
                        <h2 className="text-3xl mb-4 text-secondary text-center">Edit Subject</h2>
                        <p className="mb-4 text-center">Update subject details</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {subjectFields.map((field, index) => (
                                    <div key={index} className="w-full">
                                        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-secondary">
                                            {field.label}
                                        </div>
                                        {field.type === 'select' ? (
                                            <select
                                                onChange={(e) => handleChange(e, field.name)}
                                                value={formData[field.name] || ''}
                                                name={field.name}
                                                required
                                                className="border border-gray-400 py-2 px-4 w-full"
                                            >
                                                <option value="">{field.placeholder}</option>
                                                {field.options?.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div>
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => handleChange(e, field.name)}
                                                    className="border border-gray-400 py-2 px-4 w-full"
                                                    required
                                                />
                                                {errors[field.name] && (
                                                    <p className="text-danger text-sm mt-1">{errors[field.name]}</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex justify-around">
                  <Link href='/Admin/subjects/all/page'>

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
};

export default EditSubject;
