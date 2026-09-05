// ─────────────────────────────────────────────────────────────────────────────
// API CLIENT — Axios instance.
// ─────────────────────────────────────────────────────────────────────────────

import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://ai-analyzer-backend-a80m.onrender.com"
    : "/api");

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("auth_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error?.message ||
      err.message ||
      "Request failed";
    return Promise.reject({
      status: err.response?.status,
      message,
      details: err.response?.data?.error?.details,
      original: err,
    });
  }
);
