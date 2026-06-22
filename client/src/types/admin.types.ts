export interface Admin {
  adminId: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: Admin;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface CheckAdminResponse {
  success: boolean;
  message: string;
  data: {
    admin: Admin;
  };
}

export interface Submission {
  surveyId: string;
  name: string;
  gender: string;
  nationality: string;
  email: string;
  phoneNumber: string;
  address: string;
  message: string;
  attachmentUrl?: string;
  createdAt: string;
}

export interface PaginatedSubmissions {
  submissions: Submission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SubmissionsResponse {
  success: boolean;
  message: string;
  data: PaginatedSubmissions;
}

