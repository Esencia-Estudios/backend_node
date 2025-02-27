import yup from 'yup';
import { ValidationError } from '../helpers/errorHandler.js';

const roleSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().nullable()
});

const permissionSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    codename: yup.string().required('Codename is required'),
});

export const validateRoleSchema = async (body) => {
    try {
        const validate = await roleSchema.validate(body, {
            abortEarly: false,
            stripUnknown: true
        });

        return validate;
    } catch (error) {
        throw new ValidationError(error, 'Invalid application schema')
    }
}
export const validatePermissionSchema = async (body) => {
    return await permissionSchema.validate(body, { abortEarly: false });
}