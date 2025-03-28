export interface LoginData {
  email: string,
  password: string
}

export interface ForgetPassData {
  email: string
}

export interface ResetPasswordData {
  email: string,
  password: string,
  confirmPassword: string,
  seed: string
}