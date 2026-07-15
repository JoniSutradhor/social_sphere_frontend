import type { LoginFormData } from 'pages/Login/validation/index.schema';
import type { RegistrationFormData } from 'pages/Registration/validation/index.schema';
import type { ApiDataResponse } from 'api/apiTypes';
import Requester from 'utils/requester';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export type AuthResponse = ApiDataResponse<{ token: string; user: User }>;

class SocialSphereApiAuth {
    static login(data: LoginFormData): Promise<AuthResponse> {
        return Requester.post<AuthResponse>('/auth/login', data);
    }

    static register(data: RegistrationFormData): Promise<AuthResponse> {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        };

        return Requester.post<AuthResponse>('/auth/register', payload);
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static saveSession(response: AuthResponse) {
        const { token, user } = response.data;

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
