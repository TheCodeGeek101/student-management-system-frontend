"use client";
import React, { useState } from 'react';

const CreateTutor: React.FC = () => {
    const [formData, setFormData] = useState<Tutor>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        hire_date: '',
        department: '',
        bio: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            <div className="container mx-auto">
                <div className="flex justify-center w-full max-w-4xl bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-full lg:w-full py-16 px-12 bg-gray-50">
                        <h2 className="text-3xl mb-4 text-center">Register</h2>
                        <p className="mb-4 text-center">Create Tutor</p>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="border border-gray-400 py-2 px-4 w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="border border-gray-400 py-2 px-4 w-full"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border border-gray-400 py-2 px-4 w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border border-gray-400 py-2 px-4 w-full"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                                <input
                                    type="date"
                                    name="hire_date"
                                    placeholder="Hire Date"
                                    value={formData.hire_date}
                                    onChange={handleChange}
                                    className="border border-gray-400 py-2 px-4 w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    name="department"
                                    placeholder="Department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="border border-gray-400 py-2 px-4 w-full"
                                />
                            </div>
                            <div className="mt-5">
                                <textarea
                                    name="bio"
                                    placeholder="Bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="border border-gray-400 py-2 px-4 w-full h-32"
                                />
                            </div>
                            <div className="mt-5">
                                <button type="submit" className="w-full bg-mainColor py-3 text-center text-white">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTutor;
