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

// Subjects
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


// Departments
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
  
  // Teachers
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


    // Students
  export const paymentForm = [
     {
       type: 'text',
       name: 'first_name',
        placeholder: 'Firstname', 
        label: 'First Name' 
      },
    { 
      type: 'text',
       name: 'last_name', 
       placeholder: 'Surname',
        label: 'Surname'
    },
    {
       type: 'text',
        name: 'email', 
        placeholder: 'Email',
         label: 'Email'
         },
    { 
      type: 'text',
       name: 'phone_number',
        placeholder: 'Phone number',
         label: 'Phone Number'
         
        },
    { 
      type: 'date', 
      name: 'payment_date',
       placeholder: 'Payment date',
        label: 'Payment Date'
       },
       { 
      type: 'number', 
      name: 'amount',
       placeholder: 'Amount',
        label: 'Amount'
       },
       {
        label: 'Title',
        name: 'title',
        placeholder: 'Title',
        options: [
          { label: 'School Fees', value: "School Fees" },
          { label: 'School Uniform', value: "School Uniform" },
        ],
        type: 'select',
      },
          {
        label: 'Term',
        name: 'term_id',
        placeholder: 'Term',
        options: [
          { label: 'Term 1', value: 1 },
          { label: 'Term 2', value: 2 },
          { label: 'Term 3', value: 3 }
        ],
        type: 'select',
      },
        {
           name: 'description',
           type: 'textarea', 
           placeholder: 'description',
           label: 'Description' 
        }
  ];


  // assessments
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
        name:'total_marks',
        type:'number',
        placeholder:'Total Marks',
        label:'Total Marks',
        required:true
    },
    {
    label: 'Term',
    name: 'term_id',
    placeholder: 'Term',
    options: [
      { label: 'Term 1', value: 1 },
      { label: 'Term 2', value: 2 },
      { label: 'Term 3', value: 3 }
    ],
    type: 'select',
  },
  {
    name: 'class_id',
    type: 'select',
    placeholder: 'Student\'s class',
    label: 'Student\'s class',
    options: 'dynamic',
    required: true,
  },
    {
        name:'comments',
        type:'text',
        placeholder:'Remarks',
        label:'Score Comments',
        required:true
    },
    {
        name:'date',
        type:'date',
        placeholder:'date',
        label:'Assessment Date',
        required:true
    }
  ];

// assessments
export const resultsFields = [
  {
    name: 'student_id',
    type: 'select',
    placeholder: 'Select student',
    label: 'Student Name',
    options: 'dynamic',
    required: true,
  },
  {
    name: 'score',
    type: 'number',
    placeholder: "Student's Score",
    label: "Student's Score",
    required: true,
  },
  {
    name: 'total_marks',
    type: 'number',
    placeholder: 'Total Marks',
    label: 'Total Marks',
    required: true,
  },
  {
    label: 'Term',
    name: 'term_id',
    placeholder: 'Term',
    options: [
      { label: 'Term 1', value: 1 },
      { label: 'Term 2', value: 2 },
      { label: 'Term 3', value: 3 },
    ],
    type: 'select',
  },
  {
    name: 'class_id',
    type: 'select',
    placeholder: 'Student\'s class',
    label: 'Student\'s class',
    options: 'dynamic',
    required: true,
  },
  {
    name: 'graded_at',
    type: 'date',
    placeholder: 'Examination Date',
    label: 'Examination Date',
    required: true,
  },
  {
    name: 'include_assessments',
    type: 'checkbox',  // or you can use a select dropdown if preferred
    label: 'Include Assessments?',
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    required: false,
  },
];

 export const administratorFields = [
    {
        name: 'full_name',
        type: 'text',
        placeholder: 'Enter full name',
        label: 'Full Name',
        required: true
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Enter email address',
        label: 'Email Address',
        required: true
    },
    {
        name: 'phone_number',
        type: 'tel',
        placeholder: 'Enter phone number',
        label: 'Phone Number',
        required: true
    },
    {
        name: 'date_of_birth',
        type: 'date',
        placeholder: 'Select date of birth',
        label: 'Date of Birth',
        required: true
    },
    {
        name: 'gender',
        type: 'select',
        placeholder: 'Select gender',
        label: 'Gender',
        options: [
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' }
        ],
        required: true
    },
    {
        name: 'street',
        type: 'text',
        placeholder: 'Enter street address',
        label: 'Street Address',
        required: true
    },
    {
        name: 'city',
        type: 'text',
        placeholder: 'Enter city',
        label: 'City',
        required: true
    },
    {
        name: 'state',
        type: 'text',
        placeholder: 'Enter state',
        label: 'State',
        required: true
    },
    {
        name: 'postal_code',
        type: 'text',
        placeholder: 'Enter postal code',
        label: 'Postal Code',
        required: true
    },
    {
        name: 'country',
        type: 'text',
        placeholder: 'Enter country',
        label: 'Country',
        required: true
    },
    {
        name: 'employee_id',
        type: 'text',
        placeholder: 'Enter employee ID',
        label: 'Employee ID',
        required: true
    },
    {
        name: 'position',
        type: 'select',
        placeholder: 'Position',
        label: 'Position',
        options: [
            { value: 'head_teacher', label: 'Head Teacher' },
            { value: 'deputy_head_teacher', label: 'Deputy Head Teacher' },
            { value: 'secretary', label: 'Secretary' },
            { value: 'bursar', label: 'Bursar' },
            { value: 'assistant_bursar', label: 'Assistant Bursar' },
            { value: 'it_officer', label: 'IT Officer' }
        ],
        required: true
    },
    {
        name: 'department',
        type: 'text',
        placeholder: 'Enter department',
        label: 'Department',
        required: false
    },
    {
        name: 'date_of_hire',
        type: 'date',
        placeholder: 'Select date of hire',
        label: 'Date of Hire',
        required: true
    },
    {
        name: 'employment_type',
        type: 'select',
        placeholder: 'Select employment type',
        label: 'Employment Type',
        options: [
            { value: 'Full-Time', label: 'Full-Time' },
            { value: 'Part-Time', label: 'Part-Time' },
            { value: 'Contract', label: 'Contract' }
        ],
        required: false
    },
    {
        name: 'emergency_contact_name',
        type: 'text',
        placeholder: 'Enter emergency contact name',
        label: 'Emergency Contact Name',
        required: false
    },
    {
        name: 'emergency_contact_relationship',
        type: 'text',
        placeholder: 'Enter relationship',
        label: 'Emergency Contact Relationship',
        required: false
    },
    {
        name: 'emergency_contact_phone',
        type: 'tel',
        placeholder: 'Enter emergency contact phone',
        label: 'Emergency Contact Phone',
        required: false
    },
    {
        name: 'emergency_contact_email',
        type: 'email',
        placeholder: 'Enter emergency contact email',
        label: 'Emergency Contact Email',
        required: false
    }
];

