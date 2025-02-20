import yup from 'yup';

const authSchema = yup.object().shape({
    username: yup.string()
        .required('Username is required'),
    password: yup.string()
        .required('Password is required'),
});

export const validateLogin = async (loginData) => {
    return await authSchema.validate(loginData, { abortEarly: false });
}
