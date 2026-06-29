import axios from "axios";
import { useAdminStore } from "../store/adminStore";
import { toast } from "sonner";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const { isAuthenticated } = useAdminStore.getState();

        if (isAuthenticated) {
          useAdminStore.setState({ admin: null, isAuthenticated: false });

          toast.error("Session expired. Please log in again.");
        }
      } catch (err) {
        console.error("Failed to clear authentication session:", err);
      }
    }
    return Promise.reject(error);
  }
);