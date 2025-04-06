export interface ChangeData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  profileImage?: FileList;
  password: string;
  confirmPassword: string;
}

export interface VerfiyData {
  email: string;
  code: string;
}

export interface ForgetPassData {
  email: string;
}

export interface ResetData {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}



