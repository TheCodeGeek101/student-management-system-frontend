'use client';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/router';

// const BASE_URL = "LOCA";

const TwoFactor: React.FC = () => {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [secret, setSecret] = useState<string | null>(null);

    // Destructure `data` from the query, which contains logged-in user info
    const { data } = router.query;

    /* Generate a QR */
    const get2faQrCode = async () => {
        try {
            const response = await axios.get(`/api/2fa/qrcode`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.data.status === 200) {
                setQrImage(response.data.data);
                setSecret(response.data.secret);
            }
        } catch (error) {
            console.error("Error fetching QR code", error);
        }
    };

    useEffect(() => {
        get2faQrCode();
    }, []);

    /* Validate OTP Code */
    const handleOtpChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);

        if (e.target.value.length === 6 && secret) {
            try {
                const token = e.target.value;
                const response = await axios.post(`/api/2fa/verify`, {
                    secret,
                    token
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.data.verified) {
                    // 2FA Enabled successfully
                    // Redirect based on user type

                    if(!data) return;

                    if (data.superadmin) {
                        router.push('/Admin/dashboard/page');
                    } else if (data.admin) {
                        const { position } = data.admin;

                        switch (position) {
                            case "Bursar":
                            case "Assistant Bursar":
                                router.push('/Admin/bursar/dashboard/page');
                                break;
                            case "Secretary":
                                router.push('/Admin/secretary/dashboard/page');
                                break;
                            case "It Officer":
                                router.push('/Admin/it-officer/dashboard/page');
                                break;
                            case "Head Teacher":
                            case "Deputy Head Teacher":
                                router.push('/Admin/dashboard/page');
                                break;
                            default:
                                router.push('/Admin/bursar/dashboard/page');
                                break;
                        }
                    } else if (data.student) {
                        router.push('/Student/dashboard/page');
                    } else if (data.tutor) {
                        router.push('/Tutors/dashboard/page');
                    }
                } else {
                    setInvalidOtp(true);
                }
            } catch (error) {
                console.error("Error verifying OTP", error);
                setInvalidOtp(true);
            }
        }
    };

    return (
        <div className='flex justify-end w-full'>
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex flex-1 justify-center items-center p-4 text-white rounded-md">
                        {qrImage && (
                            <Image
                                src={qrImage}
                                alt="2FA QR Code"
                                className='rounded-lg border-2'
                                width={200}  // Set a fixed width or a proper width for the Image component
                                height={200} // Set a fixed height or a proper height for the Image component
                            />
                        )}
                    </div>
                    <div className="flex-1 p-4 text-white rounded-md">
                        <p className="text-2xl text-gray-700 font-bold mb-4">
                            Use an Authenticator App to enable 2FA
                        </p>
                        <ul className="list-none list-inside mb-4 text-gray-700">
                            <li className="mb-2">
                                <span className="font-bold">Step 1:</span> Scan the QR Code with your Authenticator app.
                            </li>
                            <li className="mb-2">
                                <span className="font-bold">Step 2:</span> Enter the code below from your app.
                            </li>
                        </ul>
                        {/* OTP Input */}
                        <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={handleOtpChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        {/* Invalid Input */}
                        {invalidOtp && (
                            <p className="mt-3 text-red-500 text-sm text-center">
                                *Invalid Code
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoFactor;
