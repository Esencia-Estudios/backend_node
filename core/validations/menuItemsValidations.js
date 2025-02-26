import yup from "yup";

const menuItemSchema = yup.object().shape({
    applicationId: yup.number()
        .required('Application is required'),
    name: yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Name is required'),
    icon: yup.string()
        .min(3, 'Icon must be at least 3 characters long')
        .required('Icon is required')
});

const menuItemUpdateSchema = yup.object().shape({
    applicationId: yup.number()
        .when([], {
            is: (value) => value !== undefined && value !== null,
            then: yup.number().required('Application id is required')
        }),
    name: yup.string()
        .min(3, 'Name must be at least 3 characters long')
        .when([], {
            is: (value) => value !== undefined && value !== null,
            then: yup.string().required('Name is required')
        }),
    icon: yup.string()
        .min(3, 'Icon must be at least 3 characters long')
        .when([], {
            is: (value) => value !== undefined && value !== null,
            then: yup.string().required('Icon is required')
        }),
});

export const validateMenuItemsSchema = (menuItemData) => {
    return menuItemSchema.validate(menuItemData, { abortEarly: false });
}

export const validateMenuItemsUpdateSchema = (menuItemData) => {
    return menuItemUpdateSchema.validate(menuItemData, { abortEarly: false });
}