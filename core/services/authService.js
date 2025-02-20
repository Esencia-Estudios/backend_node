import * as authRpository from '../repositories/authRepository.js';


export const login = async (loginData) => {
    return await authRpository.login(loginData);
}

export const forceChangePassword = async (data) => {
    return await authRpository.forceChangePassword(data);
}
