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
import { assessmentFields } from '@/Utils/fields';

interface AssignSubjectProps {
  id: number;
}

const CreateAssessment: React.FC<AssignSubjectProps> = ({ id }) => {
  const [teacherId, setTeacherId] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [formData, setFormData] = useState(createInitialFormState(assessmentFields));
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<{ value: number; label: string }[]>([]);
  const endPoint = "assessments";
  const user: User | undefined = GetLoggedInUserHelper();

  useEffect(() => {
    if (user && 'tutor' in user) {
      setTeacherId(user.tutor.id);
    }

    const fetchStudents = async () => {
      try {
        const response = await axios.post('/api/getEnrolledStudents', {
          id: id,
          teacherId: teacherId,
        });

        if (response.status === 200 && response.data && Array.isArray(response.data.students)) {
          setStudents(
            response.data.students.map((student: any) => ({
              value: student.student_id,
              label: student.student_first_name + ' ' + student.student_last_name,
            }))
          );
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error: any) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [user]);

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

  const handleSelectedChange = (
    selectedOption: SingleValue<{ value: number; label: string }>,
    actionMeta: ActionMeta<{ value: number; label: string }>
  ) => {
    const name: string = actionMeta.name as string;
    const value = selectedOption ? selectedOption.value : '';
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors: any = validateForm(assessmentFields, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/AssignAssessment', {
        endPoint: endPoint,
        teacherId: teacherId,
        formData: formData,
        id: id,
      });

      if (response.status === 201) {
        toast.success('Assessment submitted successfully!');
        setFormData(createInitialFormState(assessmentFields));
        setErrors({});
      } else if (response.status === 429) {
        toast.error('Failed to submit assessment');
      } else {
        const errorMessage = response.data?.message || 'An unknown error occurred.';
        toast.error(`Failed to submit assessment: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      if (error.response) {
        toast.error(`Failed to submit assessment: ${error.response.data.error || error.message}`);
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
    <div>
      <div className="flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          drag={false}
          variants={dropIn}
          className="py-20 relative w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 pb-2 shadow-xl md:w-4/6"
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
            <div className="mb-7 mt-0 w-full text-center font-bold capitalize text-primary md:mt-7 md:text-2xl">
              Enter Assessment
            </div>
         <form onSubmit={onSubmit}>
  {assessmentFields.map(({ label, type, name, placeholder, options }) => (
    <div key={name} className="mx-2 w-full flex-1">
      <div className="mt-3 h-6 text-xs font-bold text-primary uppercase leading-8 text-gray-500">
        {label}
      </div>

      {/* Dynamic Select Input */}
      {options === 'dynamic' && type === 'select' ? (
        <Select
          options={students}
          onChange={handleSelectedChange}
          value={students.find(studentOption => studentOption.value === formData[name]) || null}
          placeholder={placeholder}
          name={name}
          className="my-2 border border-gray-50 w-full appearance-none rounded bg-white p-1 px-2 text-sm text-gray-800 outline-none"
          isClearable
        />
      ) : type === 'select' && Array.isArray(options) ? (
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
    <Link href={`/Tutors/assessments/selection/${id}`}>
      <button className="text-lg text-primary font-semibold px-5 py-2 hover:border-2 hover:bg-mainColor transition duration-300 hover:text-white border border-mainColor">
        &larr; Back
      </button>
    </Link>

    <button
      type="submit"
      disabled={Object.keys(errors).length > 0 || isSubmitting || loading}
      className={`w-28 py-2 font-semibold uppercase transition ${
        loading
          ? 'cursor-not-allowed bg-primary text-white opacity-70'
          : 'bg-primary text-white hover:border-2 hover:bg-white hover:text-primary'
      } md:w-40`}
    >
      {loading ? 'Submitting...' : 'Submit'}
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

export default CreateAssessment;
