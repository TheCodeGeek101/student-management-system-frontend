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
import { resultsFields } from '@/Utils/fields';

interface UpdateExaminationsProps {
  id: number;
}

const UpdateExaminations: React.FC<UpdateExaminationsProps> = ({ id }) => {
  const [teacherId, setTeacherId] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [formData, setFormData] = useState(createInitialFormState(resultsFields));
  const [subjectId, setSubjectId] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<{ value: number; label: string }[]>([]);
  const endPoint = "grades/show";
  const updateEndPoint = 'grades';
  const user: User | undefined = GetLoggedInUserHelper();

  useEffect(() => {
    if (user && 'tutor' in user) {
      setTeacherId(user.tutor.id);
    }

    const fetchAssessmentData = async () => {
      try {
        console.log('Requesting assessment data with:', { id, endPoint });

        const response = await axios.post('/api/ShowData', {
          id: id,
          endPoint: endPoint,
        });

        console.log('Response received:', response);

        if (response.status === 200 && response.data && !Array.isArray(response.data)) {
          const grade = response.data;

          setFormData((prevFormData: any) => ({
            ...prevFormData,
            student_id: grade.student_id,
            subject_id: grade.subject_id,
            tutor_id: grade.tutor_id,
            score: grade.score,
            total_marks: grade.total_marks,
            graded_at: grade.graded_at,
          }));

          setStudents([
            {
              value: grade.student_id,
              label: `${grade.student_first_name} ${grade.student_last_name}`,
            },
          ]);

          setSubjectId(grade.subject_id);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error: any) {
        console.error('Error fetching grade data:', error.response || error.message);
      }
    };

    fetchAssessmentData();
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

    const validationErrors: any = validateForm(resultsFields, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    console.log('DAta is' + JSON.stringify(formData));

    try {
      const response = await axios.post(`/api/UpdateGrades`, {
        updateEndPoint: updateEndPoint,
        formData: formData,
        gradeId: id,
      });

      if (response.status === 200) {
        toast.success('Assessment updated successfully!');
        setFormData(createInitialFormState(resultsFields));
        setErrors({});
      } else if (response.status === 429) {
        toast.error('Failed to update assessment');
      } else {
        const errorMessage = response.data?.message || 'An unknown error occurred.';
        toast.error(`Failed to update assessment: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Update error:', error);
      if (error.response) {
        toast.error(`Failed to update assessment: ${error.response.data.error || error.message}`);
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
              Update Results
            </div>
            <form onSubmit={onSubmit}>
              {resultsFields.map(({ label, type, name, placeholder, options }) => (
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
                <Link href={`/Tutors/results/selection/${subjectId}`}>
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
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateExaminations;
