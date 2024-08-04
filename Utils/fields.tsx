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
      {
        label: 'Class',
        name: 'class_id',
        placeholder: 'Class',
        options: [
          { label: 'Form 1', value: 1 },
          { label: 'Form 2', value: 2 },
          { label: 'Form 3', value: 3 },
          { label: 'Form 4', value: 4 }
        ],
        type: 'select',
      },
];

export const tutorFields = [
    { name: 'first_name', type: 'text', placeholder: 'First Name', label: 'First Name', required: true },
    { name: 'last_name', type: 'text', placeholder: 'Last Name', label: 'Last Name', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', label: 'Email', required: true },
    { name: 'phone', type: 'text', placeholder: 'Phone Number', label: 'Phone Number' },
    {
        label: 'Department',
        name: 'department_id',
        placeholder: 'Department',
        options: [
          { label: 'Science', value: 1 },
          { label: 'Humanities', value: 2 },
          { label: 'Languages', value: 3 },
          { label: 'Arts', value: 4 }
        ],
        type: 'select',
      },
    { name: 'hire_date', type: 'date', placeholder: 'Hire Date', label: 'Hire Date', required: true },
    { name: 'bio', type: 'textarea', placeholder: 'Bio', label: 'Bio' }
];

export const subjectFields = [
 {
    name: 'name',
    type:'text',
    placeholder: 'Subject name',
    label: 'Subject Name',
    required: true
 },
 {
    name: 'code',
    type:'text',
    placeholder: 'Subject Code',
    label: 'Subject Code',
    required: true
 },
 {
    name: 'credits',
    type:'text',
    placeholder: 'Subject Credit hours',
    label: 'Subject Credits',
    required: true
 },
 
  {
        label: 'Department',
        name: 'department_id',
        placeholder: 'Department',
        options: [
          { label: 'Science', value: 1 },
          { label: 'Humanities', value: 2 },
          { label: 'Languages', value: 3 },
          { label: 'Arts', value: 4 }
        ],
        type: 'select',
 },
 {
    label: 'Subject Class',
    name: 'class_id',
    placeholder: 'Subject Class',
    options: [
      { label: 'Form 1', value: 1 },
      { label: 'Form 2', value: 2 },
      { label: 'Form 3', value: 3 },
      { label: 'Form 4', value: 4 }
    ],
    type: 'select',
  },
 {
    name: 'description',
    type:'textarea',
    placeholder: 'Subject Description',
    label: 'Subject Description',
    required: true
 },
 
];

export const departmentFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Department Name',
      label: 'Department Name',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
      placeholder: 'Department Code',
      label: 'Department Code',
    },
    {
      name: 'head_of_department',
      type: 'number',
      placeholder: 'Head of Department ID',
      label: 'Head of Department',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      placeholder: 'Department Description',
      label: 'Department Description',
      required: true,
    },  
  ];
  
  export const selectTutor = [
    {
        name:'tutor_id',
        type:'select',
        placeholder:'Select teacher',
        label:'Available teachers in the department',
        options:'dynamic',
        required:true
    }
  ];
   export const assessmentFields = [
    {
        name:'student_id',
        type:'select',
        placeholder:'Select student',
        label:'Student Name',
        options:'dynamic',
        required:true
    },
    {
        name:'score',
        type:'number',
        placeholder:'Student\'s Score',
        label:'Student\'s Score',
        required:true
    },
    {
        name:'comments',
        type:'text',
        placeholder:'Remarks',
        label:'Score Comments',
        required:true
    }
  ];