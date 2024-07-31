import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { departmentFields } from '@/Utils/fields';
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
    departmentId: string;
}

const EditDepartment: React.FC<Props> = ({ departmentId }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const endpoint = `department/update`;
    const [formData, setFormData] = useState<FormData>(createInitialFormState(departmentFields));
    const [errors, setErrors] = useState<Errors>({});

    useEffect(() => {
        const fetchDepartmentData = async () => {
            try {
                const response = await axios.post('/api/ShowData', {
                    endPoint: 'department/show',
                    id: departmentId
                });

                if (response.status === 200) {
                    setFormData(response.data);
                } else {
                    toast.error('Failed to fetch department data');
                }
            } catch (error: any) {
                console.error('Error fetching department data:', error);
                toast.error(`Error fetching student data: ${error.message}`);
            }
        };

        fetchDepartmentData();
    }, [departmentId]);

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
        const validationErrors: any = validateForm(departmentFields, formData);
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
                id: departmentId
            });

            if (response.status === 200) {
                toast.success('department updated successfully!');
                setFormData(createInitialFormState(departmentFields));
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
                        <h2 className="text-3xl mb-4 text-secondary text-center">Edit Department</h2>
                        <p className="mb-4 text-center">Update department details</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {departmentFields.map((field, index) => (
                                    <div key={index} className="w-full">
                                        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-secondary">
                                            {field.label}
                                        </div>
                                        
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
};

export default EditDepartment;
