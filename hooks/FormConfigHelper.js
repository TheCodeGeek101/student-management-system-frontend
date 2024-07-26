export const createInitialFormState = (formFieldConfig = []) => {
  if (!Array.isArray(formFieldConfig)) {
    console.error('Invalid formFieldConfig: Expected an array but received:', formFieldConfig);
    return {}; // Return an empty object if input is invalid
  }

  return formFieldConfig.reduce((acc, field) => {
    if (field && field.name) {
      acc[field.name] = ''; // Set the default value directly
    } else {
      console.error('Invalid field configuration:', field);
    }
    return acc;
  }, {});
};

export const validateForm = (formFieldConfig, data) => {
  const newErrors = {};
  formFieldConfig.forEach((field) => {
    if (!data[field.name]) {
      newErrors[field.name] = 'This field is required';
    }
  });
  return newErrors;
};

// Validates individual fields based on the field type and set rules
export const validateField = (name, value) => {
  let error = '';
  // Field-specific validation rules
  if (!value) {
    error = 'This field is required';
  } else if (
    ['principle', 'interest', 'tenure'].includes(name) &&
    isNaN(value)
  ) {
    error = 'Must be a number';
  } else if (name === 'effective_date' && new Date(value) < new Date()) {
    error = 'Date must be in the future';
  }
  setErrors((prev) => ({ ...prev, [name]: error }));
};
