import type { LoginFormData } from 'pages/Login/validation/index.schema';
import type { RegistrationFormData } from 'pages/Registration/validation/index.schema';
import Requester from 'utils/requester';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface LoginResponse {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export type AuthResponse = LoginResponse | RegisterResponse;

class SocialSphereApiAuth {
    static login(data: LoginFormData): Promise<LoginResponse> {
        return Requester.post<LoginResponse>('/auth/login', data);
    }

    static register(data: RegistrationFormData): Promise<RegisterResponse> {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        };

        return Requester.post<RegisterResponse>('/auth/register', payload);
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static saveSession(response: AuthResponse) {
        const { token, user } =
            'data' in response
                ? response.data
                : {
                      token: response.token,
                      user: {
                          id: response._id,
                          firstName: response.firstName,
                          lastName: response.lastName,
                          email: response.email,
                      },
                  };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        Requester.setCurrentUser(user.id);
    }

    static getCurrentUser(): User | null {
        const user = localStorage.getItem('user');

        return user ? JSON.parse(user) : null;
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}

export default SocialSphereApiAuth;
