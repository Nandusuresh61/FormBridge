import { API } from "../Api";
import type { LoginResponse, LogoutResponse, CheckAdminResponse, SubmissionsResponse } from "../../types/admin.types";
import { API_ROUTES } from "../../constants/apiRoutes";

export interface AdminCredentials {
  email: string;
  password: string;
}

export const adminApi = {
  login: async (credentials: AdminCredentials): Promise<LoginResponse> => {
    const response = await API.post<LoginResponse>(API_ROUTES.ADMIN.LOGIN, credentials);
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await API.post<LogoutResponse>(API_ROUTES.ADMIN.LOGOUT);
    return response.data;
  },

  checkSession: async (): Promise<CheckAdminResponse> => {
    const response = await API.get<CheckAdminResponse>(API_ROUTES.ADMIN.CHECK_SESSION);
    return response.data;
  },

  getSubmissions: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    gender?: string;
    nationality?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<SubmissionsResponse> => {
    const response = await API.get<SubmissionsResponse>(API_ROUTES.ADMIN.SUBMISSIONS, { params });
    return response.data;
  },
};

