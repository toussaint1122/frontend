import { promises } from "dns";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if(!API_URL){
    throw new Error("NEXT_PUBLIC_URL is not set");
}

export type ApiError = {
    message: string;
    errors?: Record;
};

export type AuthResponse = {
  token: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

async function request(
  path: string,
  options: RequestInit = {}
): Promise <any> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error: ApiError = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  return res.json() as Promise <any>;
}

export const api = {
  auth: {
    register: (data: { name: string; email: string; password: string }) =>
      request("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    login: (data: { email: string; password: string }) =>
      request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    me: (token: string) =>
      request<{ user :User }>("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      }),
  },
};