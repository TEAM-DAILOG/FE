import { create } from "axios";

// 공통 axios 인스턴스
export const baseApi = create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
