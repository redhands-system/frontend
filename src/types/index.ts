// 사용자 관련
export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface SignupRequest {
    username: string;
    password: string;
    email: string;
    role?: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}

// 재고 관련
export interface Part {
    id: number;
    name: string;
    count: number;
}

// 주문 관련
export interface OrderRequest {
    partId: number;
    quantity: number;
}