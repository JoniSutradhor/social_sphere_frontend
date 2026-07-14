import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';
import config from 'utils/config';

class Requester {
    private static currentUserId: string | null = null;

    private static readonly api: AxiosInstance = axios.create({
        baseURL: `${config.social_sphere_api_url}/api`,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    static {
        Requester.api.interceptors.request.use(
            (request) => {
                const token = localStorage.getItem('token');

                if (token) {
                    request.headers.Authorization = `Bearer ${token}`;
                }

                if (
                    Requester.currentUserId &&
                    request.method?.toLowerCase() === 'get'
                ) {
                    request.params = {
                        ...(request.params || {}),
                        currentUserId: Requester.currentUserId,
                    };
                }

                return request;
            },
            (error) => Promise.reject(error)
        );

        Requester.api.interceptors.response.use(
            (response: AxiosResponse) => response.data,
            (error: AxiosError<any>) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }

                const responseError = error.response?.data?.error;

                const message =
                    error.response?.data?.message ||
                    (typeof responseError === 'string' ? responseError : responseError?.message) ||
                    error.message ||
                    'Something went wrong';

                return Promise.reject(new Error(message));
            }
        );
    }

    static setCurrentUser(userId: string | null) {
        Requester.currentUserId = userId ? userId : null;
    }

    static getCurrentUser() {
        return Requester.currentUserId;
    }

    static get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return Requester.api.get(url, config);
    }

    static post<T = any>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return Requester.api.post(url, data, config);
    }

    static put<T = any>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return Requester.api.put(url, data, config);
    }

    static patch<T = any>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return Requester.api.patch(url, data, config);
    }

    static delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return Requester.api.delete(url, config);
    }

    static upload<T = any>(
        url: string,
        fields: Record<string, any>,
        onUploadProgress?: (progress: number) => void,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const formData = new FormData();

        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
        });

        return Requester.api.post(url, formData, {
            ...config,
            headers: {
                ...config?.headers,
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (event) => {
                if (!event.total || !onUploadProgress) return;

                const progress = Math.round((event.loaded * 100) / event.total);

                onUploadProgress(progress);
            },
        });
    }
}

export default Requester;
