interface Adminstrator {
  id: any;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  profile_picture: File | null;
  employee_id: string;
  position: string;
  department: string;
  date_of_hire: string;
  employment_type: string;
  emergency_contact_name: string;
  emergency_contact_relationship: string | null;
  emergency_contact_phone: string;
  emergency_contact_email: string;
}
