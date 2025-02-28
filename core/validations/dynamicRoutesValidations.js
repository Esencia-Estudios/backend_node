import yup from 'yup';

const dynamicRouteSchema = yup.object().shape({
    name: yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .when([], {
            is: (value) => value !== undefined && value !== null,
            then: yup.string().required('Name is required')
        }),
    path: yup.string()
        .min(3, 'Path must be at least 3 characters long')
        .when([], {
            is: (value) => value !== undefined && value !== null,
            then: yup.string().required('Path is required')
        }),
    component: yup.string()
        .min(3, 'Component must be at least 3 characters long')
        .when([], {
            is: (value) => value !== undefined && value !== null,
            then: yup.string().required('Component is required')
        }),
});

export const validateDynamicRouteSchema = (dynamicRouteData) => {
    return dynamicRouteSchema.validate(dynamicRouteData, { abortEarly: false });
}
