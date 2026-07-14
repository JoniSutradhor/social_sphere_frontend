import { z } from 'zod';

export const registrationSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z
            .string()
            .min(1, 'Email is required')
            .email('Enter a valid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters'),
        repeatPassword: z.string().min(1, 'Please repeat your password'),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: 'Passwords do not match',
        path: ['repeatPassword'],
    });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
