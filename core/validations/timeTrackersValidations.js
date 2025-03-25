import yup from 'yup';
import { ValidationError } from '../helpers/errorHandler.js';

const timeTrackerSchema = yup.object().shape({
    user_id: yup.number().integer().required('User ID is required'),
    start_time: yup.date().required('Start time is required'),
    end_time: yup.date()
        .nullable()
        .test('is-after-start', 'End time must be after start time', function (value) {
            const { start_time } = this.parent;
            return !value || new Date(value) > new Date(start_time);
        }),
    description: yup.string().nullable(),
    project_id: yup.number().integer().nullable(),
    status: yup.string().oneOf(['active', 'paused', 'completed'], 'Invalid status').required('Status is required')
});

export const validateTimeTrackerSchema = async (body) => {
    try {
        const validate = await timeTrackerSchema.validate(body, {
            abortEarly: false,
            stripUnknown: true
        });
        return validate;
    } catch (error) {
        throw ValidationError(error, 'Invalid time tracker schema');
    }
};
