export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email format",
  },
};

export const passwordValidation = {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    message:
      "At least 6 characters: UPPER/lowercase, numbers, and special characters",
  },
};

export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must be at least 3 characters long",
  },
  maxLength: {
    value: 50,
    message: "Name must be less than 50 characters",
  },
  pattern: {
    value: /^[A-Za-z\s]+$/,
    message: "Name can only contain letters and spaces",
  },
};

export const phoneValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^[0-9]{10,15}$/,
    message: "Invalid phone number format (10-15 digits only)",
  },
};

export const confirmPasswordValidation = (password: string) => ({
  required: "Confirm password is required",
  validate: (value: string) => value === password || "Passwords do not match",
});
