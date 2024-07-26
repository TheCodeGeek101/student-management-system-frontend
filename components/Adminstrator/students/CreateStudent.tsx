import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { inputFields } from '@/Utils/fields';
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
    inputFields: Field[];
    formData: FormData;
    errors: Errors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}

const CreateStudent: React.FC = () => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const endpoint = "students/create";
    const [formData, setFormData] = useState(createInitialFormState(inputFields));
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
        const validationErrors:any = validateForm(inputFields, formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        console.log("Form data:", JSON.stringify(formData));
        const data = JSON.stringify(formData);
        try {
            setIsLoading(true);
            const response = await axios.post('/api/students/PostDataApi', {
                endPoint: endpoint,
                data: formData,
            });
            console.log("Response data:", response.data);

            if (response.status === 200) {
                toast.success(`Student created successfully!`);
                setFormData(createInitialFormState(inputFields));
            } else {
                const errorMessage = response.data.message || 'An unknown error occurred.';
                toast.error(`Failed to submit student data`);
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
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="container mx-auto">
                <div className="flex justify-center w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-full py-16 px-12 bg-gray-50">
                        <h2 className="text-3xl mb-4 text-secondary text-center">Register</h2>
                        <p className="mb-4 text-center">Create student</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {(inputFields || []).map((field, index) => (
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
                                                {(field.options ?? []).map((option) => (
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
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className={`w-28 py-2 font-semibold uppercase transition ${
                                        loading
                                            ? 'cursor-not-allowed bg-primary text-white opacity-70'
                                            : 'bg-mainColor text-white hover:border-2 hover:bg-white hover:text-primary'
                                    } md:w-40`}
                                >
                                    {loading ? 'Creating...' : 'Create'}
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

export default CreateStudent;
