import * as yup from 'yup';
import { validateUniqueUser } from '../validators/userValidators';

// Definimos una interfaz para el usuario
interface User {
    user_code: string;
    email: string;
    username: string;
    password: string;
    is_active?: boolean;
    is_staff?: boolean;
    is_superuser?: boolean;
    profile_image?: string;
    hide_email?: boolean;
    is_admin?: boolean;
    status?: 'active' | 'inactive';
    is_primary_contact?: boolean;
    job_title: string;
    disable_login?: boolean;
    note?: string;
    language?: 'en' | 'es' | 'fr';
    enable_web_notification?: boolean;
    enable_email_notification?: boolean;
    requested_account_removal?: boolean;
    role_ids?: number[];
}

// Esquema de validación para la creación de usuario
const userSchema: yup.Schema<User> = yup.object().shape({
    user_code: yup.string()
        .required('User code is required')
        .matches(/^\d{4}$/, 'User code must be a 4-digit number'),
    email: yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    username: yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one letter, one number, and one special character'),
    is_active: yup.boolean().optional(),
    is_staff: yup.boolean().optional(),
    is_superuser: yup.boolean().optional(),
    profile_image: yup.string()
        .url('Profile image must be a valid URL')
        .optional(),
    hide_email: yup.boolean().optional(),
    is_admin: yup.boolean().optional(),
    status: yup.string()
        .oneOf(['active', 'inactive'], 'Status must be either active or inactive')
        .optional(),
    is_primary_contact: yup.boolean().optional(),
    job_title: yup.string().required('Job title is required'),
    disable_login: yup.boolean().optional(),
    note: yup.string().optional(),
    language: yup.string()
        .oneOf(['en', 'es', 'fr'], 'Language must be one of: en, es, fr')
        .optional(),
    enable_web_notification: yup.boolean().optional(),
    enable_email_notification: yup.boolean().optional(),
    requested_account_removal: yup.boolean().optional(),
    role_ids: yup.array()
        .of(yup.number().required('Role ID must be a number'))
        .optional()
});

// Esquema de validación para ID de usuario
const userIdSchema: yup.Schema<{ id: string }> = yup.object().shape({
    id: yup.string()
        .required("User ID is required")
        .matches(
            /^[0-9a-fA-F-]{36}$/,
            "User ID must be a valid UUID format"
        )
});

// Esquema de validación para actualización de usuario (campos opcionales)
const userUpdateSchema: yup.Schema<Partial<User>> = yup.object().shape({
    user_code: yup.string()
        .matches(/^\d{4}$/, 'User code must be a 4-digit number')
        .optional(),
    email: yup.string()
        .email('Email must be a valid email address')
        .optional(),
    username: yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .optional(),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one letter, one number, and one special character')
        .optional(),
    is_active: yup.boolean().optional(),
    is_staff: yup.boolean().optional(),
    is_superuser: yup.boolean().optional(),
    profile_image: yup.string()
        .url('Profile image must be a valid URL')
        .optional(),
    hide_email: yup.boolean().optional(),
    is_admin: yup.boolean().optional(),
    status: yup.string()
        .oneOf(['active', 'inactive'], 'Status must be either active or inactive')
        .optional(),
    is_primary_contact: yup.boolean().optional(),
    job_title: yup.string().optional(),
    disable_login: yup.boolean().optional(),
    note: yup.string().optional(),
    language: yup.string()
        .oneOf(['en', 'es', 'fr'], 'Language must be one of: en, es, fr')
        .optional(),
    enable_web_notification: yup.boolean().optional(),
    enable_email_notification: yup.boolean().optional(),
    requested_account_removal: yup.boolean().optional(),
    role_ids: yup.array()
        .of(yup.number().required('Role ID must be a number'))
        .optional()
});

// Funciones de validación con tipado
export const validateUserIdParameters = async (userIdData: { id: string }) => {
    return await userIdSchema.validate(userIdData, { abortEarly: false });
};

export const validateUserParameters = async (userData: User) => {
    await userSchema.validate(userData, { abortEarly: false });
    const unique = await validateUniqueUser(userData);
    return unique;
};

export const validateUserUpdateParameters = async (userData: Partial<User>) => {
    return await userUpdateSchema.validate(userData, { abortEarly: false });
};
