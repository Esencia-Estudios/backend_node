import * as Yup from 'yup';
import { UserRepository } from '../repositories/userRepository';

// Esquema de validación para la creación de usuario
export const userSchema = Yup.object().shape({
    user_code: Yup.string()
        .required('User code is required')
        .matches(/^\d{4}$/, 'User code must be a 4-digit number'),
    email: Yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one letter, one number, and one special character'),
    is_active: Yup.boolean(),
    is_staff: Yup.boolean(),
    is_superuser: Yup.boolean(),
    profile_image: Yup.string().url('Profile image must be a valid URL'),
    hide_email: Yup.boolean(),
    is_admin: Yup.boolean(),
    status: Yup.string().oneOf(['active', 'inactive'], 'Status must be either active or inactive'),
    is_primary_contact: Yup.boolean(),
    job_title: Yup.string().required('Job title is required'),
    disable_login: Yup.boolean(),
    note: Yup.string(),
    language: Yup.string().oneOf(['en', 'es', 'fr'], 'Language must be one of: en, es, fr'),
    enable_web_notification: Yup.boolean(),
    enable_email_notification: Yup.boolean(),
    requested_account_removal: Yup.boolean(),
    role_ids: Yup.array().of(Yup.number().required('Role ID must be a number'))
});

// Esquema de validación para el ID del usuario
export const userIdSchema = Yup.object().shape({
    id: Yup.string()
        .required("User ID is required")
        .matches(/^[0-9a-fA-F-]{36}$/, "User ID must be a valid UUID format")
});

// Esquema de validación para actualización de usuario (todos los campos opcionales)
export const userUpdateSchema = Yup.object().shape({
    user_code: Yup.string().matches(/^\d{4}$/, 'User code must be a 4-digit number').notRequired(),
    email: Yup.string().email('Email must be a valid email address').notRequired(),
    username: Yup.string().min(3, 'Username must be at least 3 characters long').notRequired(),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one letter, one number, and one special character')
        .notRequired(),
    is_active: Yup.boolean().notRequired(),
    is_staff: Yup.boolean().notRequired(),
    is_superuser: Yup.boolean().notRequired(),
    profile_image: Yup.string().url('Profile image must be a valid URL').notRequired(),
    hide_email: Yup.boolean().notRequired(),
    is_admin: Yup.boolean().notRequired(),
    status: Yup.string().oneOf(['active', 'inactive'], 'Status must be either active or inactive').notRequired(),
    is_primary_contact: Yup.boolean().notRequired(),
    job_title: Yup.string().notRequired(),
    disable_login: Yup.boolean().notRequired(),
    note: Yup.string().notRequired(),
    language: Yup.string().oneOf(['en', 'es', 'fr'], 'Language must be one of: en, es, fr').notRequired(),
    enable_web_notification: Yup.boolean().notRequired(),
    enable_email_notification: Yup.boolean().notRequired(),
    requested_account_removal: Yup.boolean().notRequired(),
    role_ids: Yup.array().of(Yup.number().required('Role ID must be a number')).notRequired()
});

// Validación de existencia de usuario único
export const validateUniqueUser = async (userData: { user_code: string; email: string; username: string }): Promise<boolean> => {
    const { user_code, email, username } = userData;

    const existingUserCode = await UserRepository.findByUserCode(user_code);
    if (existingUserCode) {
        throw new Error(`User code ${user_code} already exists.`);
    }

    const existingEmail = await UserRepository.findByEmail(email);
    if (existingEmail) {
        throw new Error(`Email ${email} already exists.`);
    }

    const existingUsername = await UserRepository.findByUsername(username);
    if (existingUsername) {
        throw new Error(`Username ${username} already exists.`);
    }

    return true;
};

// Función para validar ID de usuario
export const validateUserIdParameters = async (userIdData: { id: string }) => {
    return await userIdSchema.validate(userIdData, { abortEarly: false });
};

// Función para validar datos de creación de usuario
export const validateUserParameters = async (userData: any) => {
    await userSchema.validate(userData, { abortEarly: false });
    return await validateUniqueUser(userData);
};

// Función para validar datos de actualización de usuario
export const validateUserUpdateParameters = async (userData: any) => {
    return await userUpdateSchema.validate(userData, { abortEarly: false });
};
