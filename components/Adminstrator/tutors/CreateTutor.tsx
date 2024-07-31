"use client";
import React, { useState } from 'react';
import { tutorFields } from '@/Utils/fields';
import { createInitialFormState } from '@/hooks/FormConfigHelper';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { validateForm } from '@/hooks/FormConfigHelper';
import Loader from '@/components/Shared/Loader';

interface Tutor {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: string;
  department: string;
  bio: string;
}

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  options?: { value: string; label: string }[]; // Added options property for select fields
};

type FormData = {
  [key: string]: string;
};

type Errors = {
  [key: string]: string;
};

const CreateTutor: React.FC = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const endpoint = "tutors/create";
  const [formData, setFormData] = useState<Tutor>(createInitialFormState(tutorFields));
  const [errors, setErrors] = useState<Errors>({});

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
    // Handle form submission
    const validationErrors:any = validateForm(tutorFields, formData);
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
        toast.success('Tutor created successfully!');
        setFormData(createInitialFormState(tutorFields));
      } else {
        const errorMessage = response.data.message || 'An unknown error occurred.';
        toast.error(`Failed to submit tutor data: ${errorMessage}`);
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
        {loading && <Loader />} {/* Corrected rendering of the Loader component */}
        <div className="flex justify-center w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="w-full lg:w-full py-16 px-12 bg-gray-50">
            <h2 className="text-3xl mb-4 text-center text-mainColor">Register</h2>
            <p className="mb-4 text-center text-gray-50">Create Tutor</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {tutorFields.map((field) => (
                  <div key={field.name} className={field.type === 'textarea' ? 'col-span-2' : ''}>
                    <label className="block mb-1 text-mainColor">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof Tutor]}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLTextAreaElement>, field.name)}
                        className="border border-gray-50 py-2 px-4 w-full h-32"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name as keyof Tutor]}
                        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLSelectElement>, field.name)}
                        className="border border-gray-400 py-2 px-4 w-full"
                        required={field.required}
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
                        className="border border-gray-50 py-2 px-4 w-full"
                        required={field.required}
                      />
                    )}
                    {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
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
        <Toaster position="top-center" />
      </div>
    </div>
  );
}

export default CreateTutor;
