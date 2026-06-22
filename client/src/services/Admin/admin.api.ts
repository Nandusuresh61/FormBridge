import { API } from "../Api";
import type { LoginResponse, LogoutResponse, CheckAdminResponse } from "../../types/admin.types";

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
};
