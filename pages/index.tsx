"use client";
// import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PageWrapper from "@/components/Shared/PageWrapper";
import { useState } from "react";
import Link from "next/link";
import { GiPadlock } from "react-icons/gi";
import { ImEnvelop } from "react-icons/im";
import { BallTriangle } from "react-loader-spinner";
import Image from "next/image";
import logo from "../public/images/logo.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormErrors {
  email?: string;
  password?: string;
}


export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } 
    // else if (password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters long";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validateForm()) return;
      setIsLoading(true);
      try {
        const response = await axios.post('/api/login', { email,password });
        console.log(
          ' status' + response.status + 'message :' + response.data.message,
        );
        if (response.status === 200) {
          toast.success(response.data.message || 'Login successful');
          // setUser(response.data.user); // Update context with user data
          router.push('/Admin/dashboard/page'); // Navigate to the admin dashboard
        } else if (response.status === 500) {
          toast.error(response.data.message);
        } else if (response.status == 401) {
          toast.error(`${response.data.message}`);
        } else {
          toast.error(
            `Error: ${response.data.message}` || 'Unknown error occured',
          );
        }
      } catch (error:any) {
        toast.error(error.response?.data.message || 'Unexpected error occurred');
      } finally {
        setIsLoading(false);
        
      }
    };
  
  

    return (
        <>
            <PageWrapper>
                <div className="flex flex-col items-center justify-center w-4/5 min-h-screen py-5 pt-5 mx-4 sm:pt-0 sm:mx-2">
                    <main className="flex flex-col items-center justify-center flex-1 w-full px-0 text-center sm:px-20">
                        <div className="flex flex-col w-full max-w-4xl bg-white shadow-2xl rounded-2xl sm:w-6/7 sm:flex-row">
                            <div className="w-full p-10 sm:w-3/5 sm:p-5">
                                <div className="font-bold text-left text-gray-400">
                                    <span className="text-mainColor text-[30px]">.</span>
                                </div>
                                <div className="py-5">
                                    <div className="flex justify-center">
                                        <Link href="/">
                                            <Image
                                                width={150}
                                                height={40}
                                                src={logo}
                                                alt="Logo"
                                                className="flex justify-center  ml-10"
                                                priority
                                            />
                                        </Link>
                                    </div>
                                    <h2 className="mb-2 text-3xl font-bold text-mainColor">
                                        Welcome Back
                                    </h2>
                                    <div className="inline-block w-10 mb-2 border-2 border-mainColor"></div>
                                    <p className="mb-3 text-gray-500">Use your email account</p>
                                    <form onSubmit={onSubmit}>
                                        <div className="flex flex-col items-center">
                                            <div className="flex flex-col w-64 mb-3">
                                                <div className="flex items-center rounded-lg border border-mainColor">
                                                    <ImEnvelop className="m-2 text-gray-400 " />
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="email"
                                                        className="rounded-lg py-2 px-4 w-full"
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                )}
                                            </div>
                                            <div className="flex flex-col w-64 mb-3">
                                                <div className="flex items-center rounded-lg border border-mainColor">
                                                    <GiPadlock className="m-2 text-gray-400 " />
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="password"
                                                        className="rounded-lg py-2 px-4 w-full"
                                                    />
                                                    <div className="relative inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                                                        <svg
                                                            className="h-4 text-gray-700"
                                                            fill="none"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 576 512"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                {errors.password && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                                )}
                                            </div>
                                            <div className="flex justify-between w-64 mt-2 mb-5 text-gray-500">
                                                <label className="flex items-center text-xs">
                                                    <input type="checkbox" name="remember" className="mr-1" />{' '}
                                                    Remember me
                                                </label>
                                                <Link href="#" className="text-xs">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <button
                                                type="submit"
                                                className="inline-block w-64 px-12 py-2 font-semibold text-mainColor transition duration-300 ease-in-out border-2 border-mainColor rounded-full hover:bg-mainColor hover:text-white"
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center justify-between gap-3">
                                                        <BallTriangle
                                                            height={25}
                                                            width={25}
                                                            radius={6}
                                                            color="blue"
                                                            ariaLabel="ball-triangle-loading"
                                                            visible={true}
                                                        />{' '}
                                                        <p className="flex items-center w-full h-full">
                                                            Signing in...
                                                        </p>{' '}
                                                    </div>
                                                ) : (
                                                    'Sign In'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="w-full px-12 text-white bg-mainColor sm:w-2/5 sm:rounded-tr-2xl rounded-2xl sm:rounded-br-2xl py-36 ">
                                <h2 className="mb-2 text-3xl font-bold">Hello, Friend</h2>
                                <div className="inline-block w-10 mb-2 border-2 border-white-600"></div>
                                <p className="mb-10">
                                    Unlock your school's potential—log in and make learning magical today!
                                </p>
                            </div>
                        </div>
                        <Toaster position="top-center" />
                    </main>
                </div>
            </PageWrapper>
        </>
    );
}
