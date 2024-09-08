import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { subjectFields } from '@/Utils/fields';
import { createInitialFormState, validateForm } from "../../../hooks/FormConfigHelper";

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
    subjectFields: Field[];
    formData: FormData;
    errors: Errors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, name: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}

const CreateSubject: React.FC = () => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const endpoint = "subjects/create";
    const [formData, setFormData] = useState<FormData>(createInitialFormState(subjectFields));
    const [errors, setErrors] = useState<Errors>({} as Errors);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, name: string) => {
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
        const validationErrors: any = validateForm(subjectFields, formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        console.log("Form data:", JSON.stringify(formData));
        const data = JSON.stringify(formData);
        try {
            setIsLoading(true);
            console.log("Form data is" + formData);
            const response = await axios.post('/api/post/PostDataApi', {
                endPoint: endpoint,
                data: formData,
            });
            console.log("Response data:", response.data);

            if (response.status === 200) {
                toast.success(`Subject created successfully!`);
                setFormData(createInitialFormState(subjectFields));
                setErrors({} as Errors); // Reset errors
            } 
            else if(response.status == 500){
                toast.error('server error')
            }
            else {
                const errorMessage = response.data.message || 'An unknown error occurred.';
                toast.error(`Failed to submit subject data`);
            }
        } catch (error: any) {
            console.error('Submission error:', error);
            if (error.response) {
                toast.error(`Failed to create subject: ${error.response.data.error || error.message}`);
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
                    <div className="w-full lg:w-full py-16 px-12 bg-white">
                        <h2 className="text-3xl mb-4 text-gray-600 text-center">Register</h2>
                        <p className="mb-4 text-center">Create Subject</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {(subjectFields || []).map((field, index) => (
                                    <div key={index} className="w-full">
                                        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-600">
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
                                                {(field.options ?? []).map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : field.type === 'textarea' ? (
                                            <textarea
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={formData[field.name] || ''}
                                                onChange={(e) => handleChange(e, field.name)}
                                                className="border border-gray-400 py-2 px-4 w-full h-32"
                                            />
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
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className={`w-full py-2 font-semibold uppercase transition ${
                                        loading
                                            ? 'cursor-not-allowed bg-primary text-white opacity-70'
                                            : 'bg-mainColor text-white hover:border-2 hover:bg-white hover:text-primary'
                                    } md:w-full`}
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

export default CreateSubject;
