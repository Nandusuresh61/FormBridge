import { create } from "zustand";
import type { Admin } from "../types/admin.types";
import { type AdminCredentials, adminApi } from "../services/Admin/admin.api";

interface AdminState {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AdminCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await adminApi.login(credentials);
      if (response.success && response.data.admin) {
        set({
          admin: response.data.admin,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      set({ isLoading: false });
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      throw new Error(err.response?.data?.message || err.message || "Login failed", { cause: error });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await adminApi.logout();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      set({
        admin: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  checkSession: async () => {
    set({ isLoading: true });
    try {
      const response = await adminApi.checkSession();
      if (response.success && response.data.admin) {
        set({
          admin: response.data.admin,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          admin: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch {
      set({
        admin: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
export type { Admin };
