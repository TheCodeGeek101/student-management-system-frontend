// Define the Student interface to match the backend API
interface Student {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    address: string;
    postal_address: string;
    gender: 'F' | 'M';
    guardian_name: string;
    guardian_contact: string;
    email: string;
    phone_number?: string;
    admission_date: string;
    previous_school?: string;
    emergency_contact?: string;
    medical_info?: string;
    enrollment_status: string;
    user_id: number;
    registered_by: number;
    remarks?: string;
  }