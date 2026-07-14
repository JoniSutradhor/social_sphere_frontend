import type { LoginFormData } from 'pages/Login/validation/index.schema';
import type { RegistrationFormData } from 'pages/Registration/validation/index.schema';
import Requester from 'utils/requester';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthResponse {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

class SocialSphereApiAuth {
    /**
     * Login
     */
    static login(data: LoginFormData): Promise<AuthResponse> {
        return Requester.post<AuthResponse>('/auth/login', data);
    }

    /**
     * Registration
     */
    static register(data: RegistrationFormData): Promise<AuthResponse> {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        };

        return Requester.post<AuthResponse>('/auth/register', payload);
    }

    /**
     * Logout
     */
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    /**
     * Persist auth
     */
    static saveSession(response: AuthResponse) {
        const { token, _id, firstName, lastName, email } = response;
        const user: User = { id: _id, firstName, lastName, email };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        Requester.setCurrentUser(user.id);
    }

    /**
     * Current user
     */
    static getCurrentUser(): User | null {
        const user = localStorage.getItem('user');

        return user ? JSON.parse(user) : null;
    }

    /**
     * Logged in?
     */
    static isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}

export default SocialSphereApiAuth;
