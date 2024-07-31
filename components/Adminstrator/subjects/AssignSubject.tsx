import axios from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Select, { SingleValue, ActionMeta } from 'react-select';
import logo from '../../../public/images/logo.png';
import { createInitialFormState, validateForm } from '@/hooks/FormConfigHelper';
import { dropIn } from '@/Utils/motion';
import { selectTutor } from '@/Utils/fields';
import GetLoggedInUserHelper from '@/helpers/GetLoggedInUserHelper';
import { User } from '../../../types/user';

interface Tutor {
  id: number;
  first_name: string;
  last_name: string;
  department_name: string;
  subject_name: string;
}

interface AssignSubjectProps {
  setAssignSubjectModal: (isOpen: boolean) => void;
  id: number;
}

const AssignSubject: React.FC<AssignSubjectProps> = ({ setAssignSubjectModal, id }) => {
  const [adminstratorId, setAdminstratorId] = useState<number>(0);
  const [isSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [formData, setFormData] = useState(createInitialFormState(selectTutor));
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  
  const user: User | undefined = GetLoggedInUserHelper();

  useEffect(() => {
    if (user && 'admin' in user) {
      setAdminstratorId(user.admin.id);
      console.log("admin id is:" + user.admin.id);
    }
  }, [user]);

  const handleSelectedChange = (
    selectedOption: SingleValue<{ value: number; label: string }>,
    actionMeta: ActionMeta<{ value: number; label: string }>
  ) => {
    const name: string = actionMeta.name as string; // Ensure name is a string
    const value = selectedOption ? selectedOption.value : '';
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.post('/api/getTutor', { id });
        console.log('Response data:', response.data);

        if (response.status === 200 && response.data && Array.isArray(response.data.tutors)) {
          setTutors(response.data.tutors);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error: any) {
        console.error('Error fetching tutors:', error);
        if (error.response) {
          console.log('Server responded with status:', error.response.status);
          console.log('Response data:', error.response.data);
        } else if (error.request) {
          console.log('No response received:', error.request);
        } else {
          console.log('Error setting up request:', error.message);
        }
      }
    };

    fetchTutors();
  }, [id]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log('tutor data is:' +JSON.stringify(formData));

    const validationErrors: any = validateForm(selectTutor, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/AssignTutor', { 
        endPoint: 'subjects',
        formData: formData,
        id: id,
        adminId: adminstratorId
      });
    
      if (response.status === 200) {
        toast.success('Subject assigned successfully!');
        setFormData(createInitialFormState(selectTutor));
        setErrors({});
      }else if(response.status == 429){
        toast.error('Failed to assign subject')
      }
       else {
        const errorMessage = response.data?.message || 'An unknown error occurred.';
        toast.error(`Failed to assign subject: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      if (error.response) {
        console.log(error.response.data);
        toast.error(`Failed to assign subject: ${error.response.data.error || error.message}`);
      } else if (error.request) {
        console.log(error.request);
        toast.error('No response from server');
      } else {
        console.log('Error', error.message);
        toast.error('Error encountered: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
    
  };

  const tutorOptions = tutors.map((tutor) => ({
    value: tutor.id,
    label: `${tutor.first_name} ${tutor.last_name} (Department - ${tutor.department_name})`,
  }));

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 p-10 backdrop-blur-lg">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          drag={false}
          variants={dropIn}
          className="py-30 relative mt-20 max-h-[80vh] min-h-fit w-full max-w-xl overflow-auto rounded-2xl rounded-lg bg-white p-6 pb-2 shadow-xl md:w-4/6"
        >
          <div className="flex justify-between">
            <div>.</div>
            <button
              onClick={() => {
                setAssignSubjectModal(false);
              }}
              className="text-4xl text-primary"
            >
              &times;
            </button>
          </div>
          <div className="flex justify-center">
            <Image src={logo} alt="main_logo" width={150} height={150} />
          </div>
          <div className="relative flex flex-col">
            <div className="mb-7 mt-0 w-full text-center font-bold capitalize text-primary md:mt-7 md:text-2xl">
              Assign Subject
            </div>
            <form onSubmit={onSubmit}>
              {selectTutor.map(
                ({ label, name, placeholder }) => (
                  <div key={name} className="mx-2 w-full flex-1">
                    <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
                      {label}
                    </div>
                    <Select
                      options={tutorOptions}
                      onChange={handleSelectedChange}
                      value={
                        tutorOptions.find(
                          (tutorOption) => tutorOption.value === formData[name],
                        ) || null
                      }
                      placeholder={placeholder}
                      name={name}
                      className="my-2 w-full appearance-none rounded border border-gray-200 bg-white p-1 px-2 text-sm text-gray-800 outline-none"
                      isClearable
                    />
                    {errors[name] && (
                      <div className="text-xs italic text-red-500">
                        {errors[name]}
                      </div>
                    )}
                  </div>
                ),
              )}
              <div className="container bottom-1 mb-4 mt-4 flex justify-around">
                <button
                  onClick={() => {
                    setAssignSubjectModal(false);
                  }}
                  className="cursor-pointer rounded-[5px] border-2 border-slate-300 bg-white p-1 py-2 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-opacity-50 hover:text-primary md:w-40"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={
                    Object.keys(errors).length > 0 || isSubmitting || loading
                  }
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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AssignSubject;
