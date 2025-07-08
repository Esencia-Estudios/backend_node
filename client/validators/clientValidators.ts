import * as Yup from 'yup';
import { ClientRepository } from '@/repositories/clientRepository';

// Esquema de validación para la creación de usuario
export const clientSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    name: Yup.string()
        .required('Client is required')
        .min(3, 'Name must be at least 3 characters long'),
    nif: Yup.string()
        .required('Client is required')
        .min(5, 'Name must be at least 5 characters long')
});

// Esquema de validación para el ID del usuario
export const clientIdSchema = Yup.object().shape({
    id: Yup.string()
        .required("Client ID is required")
        .matches(/^[0-9a-fA-F-]{36}$/, "Client ID must be a valid UUID format")
});

// Esquema de validación para actualización de usuario (todos los campos opcionales)
export const clientUpdateSchema = Yup.object().shape({
    client_code: Yup.string().matches(/^\d{4}$/, 'Client code must be a 4-digit number').notRequired(),
    email: Yup.string().email('Email must be a valid email address').notRequired(),
    name: Yup.string().min(3, 'Name must be at least 3 characters long').notRequired(),
    nif: Yup.string().min(5, 'Nif must be at least 5 characters long').notRequired(),
    
});

// Validación de existencia de usuario único
export const validateUniqueClient = async (Data: { client_code: string; email: string; name: string ; nif: string}): Promise<boolean> => {
    const { client_code: client_code, email, name ,nif} = Data;

    const existingClientCode = await ClientRepository.findByClientCode(client_code);
    if (existingClientCode) {
        throw new Error(`Client code ${client_code} already exists.`);
    }

    const existingEmail = await ClientRepository.findByEmail(email);
    if (existingEmail) {
        throw new Error(`Email ${email} already exists.`);
    }

    const existingClientname = await ClientRepository.findByClientname(name);
    if (existingClientname) {
        throw new Error(`Client ${name} already exists.`);
    }

    const existingClientnif = await ClientRepository.findByClientname(nif);
    if (existingClientnif) {
        throw new Error(`Client with nif: ${nif} already exists.`);
    }

    return true;
};

// Función para validar ID de usuario
export const validateClientIdParameters = async (IdData: { id: string }) => {
    return await clientIdSchema.validate(IdData, { abortEarly: false });
};

// Función para validar datos de creación de usuario
export const validateClientParameters = async (Data: any) => {
    await clientSchema.validate(Data, { abortEarly: false });
    return await validateUniqueClient(Data);
};

// Función para validar datos de actualización de usuario
export const validateClientUpdateParameters = async (Data: any) => {
    return await clientUpdateSchema.validate(Data, { abortEarly: false });
};
