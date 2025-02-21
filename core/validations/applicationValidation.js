import yup from 'yup'
import { ValidationError } from '../helpers/errorHandler'

const applicationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    icon: yup.string().required('Icon is required'),
    description: yup.string().nullable()
});

export const validateApplicationSchema = async (body) => {
    try {
        const validate = await applicationSchema.validate(body, {
            abortEarly: false,
            stripUnknown: true
        });
        return validate;
    } catch (error) {
        throw ValidationError(error, 'Invalid application schema')
    }
}

