import axios from "axios";
import type { LoginRequest, SignupRequest, LoginResponse, Part, OrderRequest } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

// 요청 인터셉터: 모든 요청에 JWT 토큰 자동 추가
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API 함수들
export const authAPI = {
    signup: (data: SignupRequest) => api.post('/auth/signup', data),
    login: (data: LoginRequest) => api.post<LoginResponse>('/auth/login', data),
};

export const partsAPI = {
    getAll: () => api.get<Part[]>('/api/parts'),
    decrease: (id: number, quantity: number) =>
        api.put(`/api/parts/${id}/decrease?quantity=${quantity}`),
};

export const ordersAPI = {
    create: (data: OrderRequest) => api.post('/api/orders', data),
};

export default api;