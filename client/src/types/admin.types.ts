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
