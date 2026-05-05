const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const API_BASE_URL = backendUrl.replace(/\/$/, "");

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
