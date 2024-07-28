export const inputFields = [
    { type: 'text', name: 'first_name', placeholder: 'Firstname', label: 'First Name' },
    { type: 'text', name: 'last_name', placeholder: 'Surname', label: 'Surname' },
    { type: 'date', name: 'date_of_birth', placeholder: 'Date of birth', label: 'Date of Birth' },
    { type: 'text', name: 'postal_address', placeholder: 'Postal address', label: 'Postal Address' },
    { type: 'text', name: 'address', placeholder: 'Address', label: 'Address' },
    { type: 'text', name: 'guardian_name', placeholder: 'Guardian name', label: 'Guardian Name' },
    { type: 'text', name: 'guardian_contact', placeholder: 'Guardian contact', label: 'Guardian Contact' },
    { type: 'text', name: 'emergency_contact', placeholder: 'Emergency contact', label: 'Emergency Contact' },
    { type: 'text', name: 'medical_info', placeholder: 'Medical Information', label: 'Medical Information' },
    { type: 'text', name: 'previous_school', placeholder: 'Previous school', label: 'Previous School' },
    { type: 'text', name: 'email', placeholder: 'Email', label: 'Email' },
    { type: 'text', name: 'phone_number', placeholder: 'Phone number', label: 'Phone Number' },
    { type: 'date', name: 'admission_date', placeholder: 'Admission date', label: 'Admission Date' },
    {
        label: 'Gender',
        name: 'gender',
        placeholder: 'Gender',
        options: [
          { label: 'Male', value: 'M' },
          { label: 'Female', value: 'F' },
        ],
        type: 'select',
      },
];

export const tutorFields = [
    { name: 'first_name', type: 'text', placeholder: 'First Name', label: 'First Name', required: true },
    { name: 'last_name', type: 'text', placeholder: 'Last Name', label: 'Last Name', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', label: 'Email', required: true },
    { name: 'phone', type: 'text', placeholder: 'Phone Number', label: 'Phone Number' },
    { name: 'hire_date', type: 'date', placeholder: 'Hire Date', label: 'Hire Date', required: true },
    { name: 'department', type: 'text', placeholder: 'Department', label: 'Department' },
    { name: 'bio', type: 'textarea', placeholder: 'Bio', label: 'Bio' }
];