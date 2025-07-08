import * as yup from 'yup';
import { validateUniqueClient } from '@/validators/clientValidators';

// Definimos una interfaz para el usuario
interface Client {
    client_code: string;
    email: string;
    name: string;
    nif: string;

}

// Esquema de validación para la creación de usuario
const clientSchema: yup.Schema<Client> = yup.object().shape({
    client_code: yup.string()
        .required('Client code is required')
        .matches(/^\d{4}$/, 'User code must be a 4-digit number'),
    email: yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    name: yup.string()
        .required('Client name is required')
        .min(3, 'Client name must be at least 3 characters long'),
    nif: yup.string()
        .required('Client NIF is required')
        .min(5, 'Client NIF must be at least 5 characters long'),
  
});

// Esquema de validación para ID de usuario
const clientIdSchema: yup.Schema<{ id: string }> = yup.object().shape({
    id: yup.string()
        .required("Client ID is required")
        .matches(
            /^[0-9a-fA-F-]{36}$/,
            "Client ID must be a valid UUID format"
        )
});

// Esquema de validación para actualización de usuario (campos opcionales)
const clientUpdateSchema: yup.Schema<Partial<Client>> = yup.object().shape({
    client_code: yup.string()
        .matches(/^\d{4}$/, 'User code must be a 4-digit number')
        .optional(),
    email: yup.string()
        .email('Email must be a valid email address')
        .optional(),
    name: yup.string()
        .min(3, 'Client name must be at least 3 characters long')
        .optional(),
    nif: yup.string()
        .min(5, 'Client nif must be at least 5 characters long')
        .optional(),
});

// Funciones de validación con tipado
export const validateClientIdParameters = async (IdData: { id: string }) => {
    return await clientIdSchema.validate(IdData, { abortEarly: false });
};

export const validateClientParameters = async (Data: Client) => {
    await clientSchema.validate(Data, { abortEarly: false });
    const unique = await validateUniqueClient(Data);
    return unique;
};

export const validateClientUpdateParameters = async (Data: Partial<Client>) => {
    return await clientUpdateSchema.validate(Data, { abortEarly: false });
};
