import { API } from "../Api";
import type { LoginResponse, LogoutResponse, CheckAdminResponse, SubmissionsResponse } from "../../types/admin.types";

export interface AdminCredentials {
  email: string;
  password: string;
}

export const adminApi = {
  login: async (credentials: AdminCredentials): Promise<LoginResponse> => {
    const response = await API.post<LoginResponse>("/admin/login", credentials);
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await API.post<LogoutResponse>("/admin/logout");
    return response.data;
  },

  checkSession: async (): Promise<CheckAdminResponse> => {
    const response = await API.get<CheckAdminResponse>("/admin/me");
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
    const response = await API.get<SubmissionsResponse>("/admin/submissions", { params });
    return response.data;
  },
};

