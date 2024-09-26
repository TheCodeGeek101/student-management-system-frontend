import Image from 'next/image';
import { useState } from 'react';
import { Student } from '@/types/user';
import useShowDataHelper from '@/helpers/ShowDataHelper';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '@/components/Shared/Loaders/Loader';
import placeholder from "../../../public/images/placeholder.png";
import { formatDateToWords } from '@/utils/DateFormat';
import axios from 'axios';
import Link from 'next/link';

interface ShowStudentProps {
  studentId: number;
}

const ShowWithdrawnStudent: React.FC<ShowStudentProps> = ({ studentId }) => {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const endpoint = 'students/show';
  const uploadEndpoint = 'students';

  // Fetch student data
  useShowDataHelper<Student>(endpoint, studentId, setStudentData);
console.log("student data is:" + studentData);
  if (!studentData) {
    toast('Loading student data...', { duration: 1500 });
    return <DataLoader />;
  }

  const {
    first_name,
    last_name,
    gender,
    date_of_birth,
    phone_number,
    email,
    address,
    postal_address,
    guardian_name,
    guardian_contact,
    admission_date,
    emergency_contact,
    previous_school,
    medical_info,
    registration_number,
    profile_picture
  } = studentData;

  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('profile_picture', imageFile);

    try {
      const response = await axios.post(`/api/uploadImage`, {
        endPoint: uploadEndpoint,
        id: studentId,
        data: formData
      });

      if (response.status === 200) {
        toast.success('Profile picture updated successfully!');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useShowDataHelper<Student>(endpoint, studentId, setStudentData); // Refresh data after upload
      }
    } catch (error) {
      toast.error('Failed to update profile picture.');
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Profile Header */}
      <div className="w-full text-white bg-main-color">
        <div className="max-w-screen-xl px-4 mx-auto flex items-center justify-between py-4">
          <h1 className="text-lg text-blue-400 font-semibold tracking-widest uppercase">
            Student Profile
          </h1>
        </div>
      </div>

      {/* Back Button */}
      <div className="my-4">
        <Link href='/Admin/students/withdrawn/page'>
          <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-sm gap-x-2 sm:w-auto hover:bg-gray-100 dark:border-gray-300">
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
      </div>

      {/* Profile Content */}
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          {/* Profile Card */}
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-blue-400">
              <div className="image overflow-hidden">
                <Image
                  className="h-auto w-full mx-auto rounded-lg"
                  src={selectedImage || (profile_picture ? `/storage/${profile_picture}` : placeholder)}
                  width={500}
                  height={500}
                  alt="profile"
                />
              </div>
              <div className="mt-3">
                <label className="block text-sm text-gray-500">Profile picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-blue-400 file:text-white file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200"
                />
                <button
                  onClick={handleImageUpload}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Upload Image
                </button>
              </div>
              <h1 className="font-bold text-xl leading-8 my-1 text-blue-400">{`${first_name} ${last_name}`}</h1>

              <ul className="bg-blue-400 text-white py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Gender</span>
                  <span className="ml-auto">{gender === 'M' ? 'Male' : 'Female'}</span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">{formatDateToWords(admission_date)}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Profile Details */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-blue-400">
                  <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="tracking-wide">Student Information</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Date of Birth</div>
                    <div className="px-4 py-2">{formatDateToWords(date_of_birth)}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Phone Number</div>
                    <div className="px-4 py-2">{phone_number}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Registration Number</div>
                    <div className="px-4 py-2">{registration_number}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Address</div>
                    <div className="px-4 py-2">{address}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Postal Address</div>
                    <div className="px-4 py-2">{postal_address}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Guardian Name</div>
                    <div className="px-4 py-2">{guardian_name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Guardian Contact</div>
                    <div className="px-4 py-2">{guardian_contact}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Emergency Contact</div>
                    <div className="px-4 py-2">{emergency_contact}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Previous School</div>
                    <div className="px-4 py-2">{previous_school}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Medical Info</div>
                    <div className="px-4 py-2">{medical_info}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-500" href={`mailto:${email}`}>
                        {email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4"></div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ShowWithdrawnStudent;
