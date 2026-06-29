export const API_ROUTES = {
  SURVEY: {
    CREATE: "/surveys",
  },
  ADMIN: {
    LOGIN: "/admin/login",
    LOGOUT: "/admin/logout",
    CHECK_SESSION: "/admin/me",
    SUBMISSIONS: "/admin/submissions",
  },
} as const;
