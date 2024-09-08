import Image from 'next/image';
import { useState } from 'react';
import { User, Student } from '@/types/user';
import useShowDataHelper from '@/helpers/ShowDataHelper';
import toast,{Toaster} from 'react-hot-toast';
import DataLoader from '@/components/Shared/Loaders/Loader';
import placeholder from "../../../public/images/placeholder.png";
import { formatDateToWords } from '@/utils/DateFormat';
import axios from 'axios';

interface ProfileProps {
  user: User;
}

const StudentProfile: React.FC<ProfileProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const endpoint = 'students/show';
  const uploadEndpoint = 'students';
  let studentId = 0;
  if ('student' in user) {
    studentId = user.student.id;
  }

  useShowDataHelper<Student>(endpoint, studentId, setStudentData);

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
    profile_picture // Include the profile_picture attribute
  } = studentData;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    
    const formData = new FormData();
    formData.append('profile_picture', imageFile);
    
    try {
      useShowDataHelper<Student>(endpoint, studentId, setStudentData);

      const response = await axios.post(`/api/uploadImage`, {
        endPoint:uploadEndpoint,
        id:studentId,
        data:formData
      });
      if(response.status === 200){
        toast.success('Profile picture updated successfully!');
      }
      // Optionally refresh the student data to show the updated picture
    } catch (error) {
      toast.error('Failed to update profile picture.');
    }
  };

  return (
    <div className="p-6 h-screen">
      {/* Navbar */}
      <div className="w-full text-white bg-main-color">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="p-4 flex flex-row items-center justify-between">
            <a href="#" className="text-lg text-blue-400 font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">
              Student Profile
            </a>
            <button
              className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                {isOpen ? (
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          {/* Left Side - Profile Card */}
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
              <div className='mt-3'>
                <label className="block text-sm text-gray-500 dark:text-gray-300">Profile picture</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-blue-400 file:text-white file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                />
                <button 
                  onClick={handleImageUpload} 
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Upload Image
                </button>
              </div>
              <h1 className="font-bold text-xl leading-8 my-1 text-blue-400">{`${first_name} ${last_name}`}</h1>
              
              <ul className="bg-blue-400 text-white hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
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

          {/* Right Side - Profile Info */}
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
                    <div className="px-4 py-2">{email}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position='top-center'/>

    </div>
  );
};

export default StudentProfile;
