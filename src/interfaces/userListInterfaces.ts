// Define missing interfaces
export interface User {
  id: number;
  userName: string;
  isActivated: boolean;
  phoneNumber: string;
  email: string;
  creationDate: string;
}

export interface UsersListResponse {
  data: User[];
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  pageNumber: number;
}

export interface AxiosErrorResponse {
  message: string;
}

export interface ViewDetailsModalProps {
  show: boolean;
  handleClose: () => void;
  details: any;
  loading: boolean;
}


 
export interface UserRequestParams {
  pageSize?: number;
  pageNumber?: string | number;
  userName?: string | null;
  email?: string | null;
  country?: string | null;
  groups?: string | null;
}
