export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email format',
  },
}

export const passwordValidation = {
  required: 'Password is required',
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    message:
      'At least 6 characters: UPPER/lowercase, numbers, and special characters',
  },
}
export const countryValidation = {
  required: 'country is required',
  minLength: {
    value: 5,
    message: 'enter chars more than 5 ',
  },
}
export const otpValidation = {
  required: 'OTP is required',
  maxLength: {
    value: 6,
    message: 'Otp must be at 6 characters',
  },
}
export const nameValidation = {
  required: 'userName is required',
  minLength: {
    value: 3,
    message: 'Name must be at least 3 characters long',
  },
  maxLength: {
    value: 7,
    message: 'The userName may not be greater than 8 characters',
  },
  pattern: {
    value: /^[a-zA-Z]+[0-9]+$/,
    message:
      'The userName must contain characters and end with numbers without spaces',
  },
}

export const phoneValidation = {
  required: 'Phone number is required',
  pattern: {
    value: /^[0-9]{10,15}$/,
    message: 'Invalid phone number format (10-15 digits only)',
  },
}

export const confirmPasswordValidation = (password: string) => ({
  required: 'Confirm password is required',
  validate: (value: string) => value === password || 'Passwords do not match',
})
