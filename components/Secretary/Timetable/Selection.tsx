import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Select, { SingleValue, ActionMeta } from 'react-select';
import logo from '../../../public/images/logo.png';
import { createInitialFormState, validateForm } from '@/hooks/FormConfigHelper';
import { dropIn } from '@/Utils/motion';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import { User } from '../../../types/user';
import Link from 'next/link';
import { selectTimetableFields } from '@/Utils/fields';
import { useRouter } from 'next/router';

interface AssignSubjectProps {
  id: number;
}

const SelectTimetable: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [formData, setFormData] = useState(createInitialFormState(selectTimetableFields));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, name: string) => {
    const { value } = e.target;

    setFormData((prevFormData: any) => ({
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

  

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors: any = validateForm(selectTimetableFields, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
        router.push(`/Admin/secretary/timetable/form/${formData.class_id}`)
    } catch (error: any) {
      console.error('Submission error:', error);
       if(error) {
        toast.error('Error encountered: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen'>
      <div className="flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          drag={false}
          variants={dropIn}
          className="py-20 relative w-full max-w-md overflow-auto rounded-lg bg-white p-6 pb-2 shadow-xl md:w-4/6"
        >
          <div className="flex justify-between">
            <div>.</div>
            <button className="text-4xl text-primary">
              {/* &times; */}
            </button>
          </div>
          <div className="flex justify-center">
            <Image src={logo} alt="main_logo" width={150} height={150} />
          </div>
          <div className="relative flex flex-col">
            <div className="mb-7 mt-0 w-full text-center font-semibold capitalize text-primary md:mt-7 md:text-2xl">
            Select class
            </div>
         <form onSubmit={onSubmit}>
  {selectTimetableFields.map(({ label, type, name, placeholder, options }) => (
    <div key={name} className="mx-2 w-full flex-1">
      <div className="mt-3 h-6 text-xs font-bold text-primary uppercase leading-8 text-gray-500">
        {label}
      </div>

      {/* Dynamic Select Input */}
      {type === 'select' && Array.isArray(options) ? (
        // Static Select Input
        <select
          onChange={(e) => handleChange(e, name)}
          value={formData[name] || ''}
          name={name}
          required
          className="border border-gray-400 py-2 px-4 w-full"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        // Other Input Types (number, text, date, etc.)
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name] || ''}
          onChange={(e) => handleChange(e, name)}
          className="py-2 px-4 w-full"
          required
        />
      )}
      {errors[name] && (
        <div className="text-xs italic text-red-500">
          {errors[name]}
        </div>
      )}
    </div>
  ))}
  <div className="container bottom-1 mb-4 mt-4 flex justify-around">
    <Link href={`/Admin/secretary/timetable/Index`}>
      <button className="text-lg text-primary font-semibold px-5 py-2 hover:border-2 hover:bg-mainColor transition duration-300 hover:text-white border border-mainColor">
        &larr; Back
      </button>
    </Link>

    <button
      type="submit"
      disabled={Object.keys(errors).length > 0 || isSubmitting || loading}
      className={`w-20 py-2 font-semibold uppercase transition ${
        loading
          ? 'cursor-not-allowed bg-primary text-white opacity-70'
          : 'bg-primary text-white hover:border-2 hover:bg-white hover:text-primary'
      } md:w-30`}
    >
      {loading ? 'selecting...' : 'select'}
    </button>
  </div>
</form>

          
          
          </div>
          <Toaster position="top-center" />
        </motion.div>
      </div>
    </div>
  );
};

export default SelectTimetable;
