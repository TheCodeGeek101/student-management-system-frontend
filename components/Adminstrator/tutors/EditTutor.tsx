'use client';
import { createInitialFormState, validateForm } from '@/hooks/FormConfigHelper';
import { tutorFields } from '@/Utils/fields';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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
    tutorId: string;
}

const EditTutor: React.FC<Props> = ({ tutorId }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const endpoint = `tutors/update`;
    const [formData, setFormData] = useState<FormData>(createInitialFormState(tutorFields));
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        const fetchTutorData = async () => {
            try {
                const response = await axios.post('/api/ShowData', {
                    endPoint: 'tutors/show',
                    id: tutorId
                });

                if (response.status === 200) {
                    setFormData(response.data);
                } else {
                    toast.error('Failed to fetch tutor data');
                }
            } catch (error: any) {
                console.error('Error fetching tutor data:', error);
                toast.error(`Error fetching tutor data: ${error.message}`);
            }
        };

        fetchTutorData();
    }, [tutorId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

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
        const validationErrors: any = validateForm(tutorFields, formData);
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
                id: tutorId
            });

            if (response.status === 200) {
                toast.success('Teacher updated successfully!');
                setFormData(createInitialFormState(tutorFields));
            } else {
                toast.error(response.data.message || 'An unknown error occurred.');
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            if (error.response) {
                console.error('Response error data:', error.response.data);
                toast.error(`Failed to update student: ${error.response.data.error || error.message}`);
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
                        <h2 className="text-3xl mb-4 text-center text-mainColor">Register</h2>
                        <p className="mb-4 text-center text-gray-50">Create Tutor</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {tutorFields.map(field => (
                                    <div key={field.name} className={field.type === 'textarea' ? 'col-span-2' : ''}>
                                        <label className="block mb-1 text-mainColor">{field.label}</label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="border border-gray-50 py-2 px-4 w-full h-32"
                                            />
                                        ) : (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="border border-gray-50 py-2 px-4 w-full"
                                                required={field.required}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className={`w-full py-2 font-semibold uppercase transition ${
                                        loading
                                            ? 'cursor-not-allowed bg-primary text-white opacity-70'
                                            : 'bg-mainColor text-white hover:border-2 hover:bg-white hover:text-primary'
                                    } md:w-full`}
                                >
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Toaster position='top-center' />
            </div>
        </div>
    );
}

export default EditTutor;
