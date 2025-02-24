import * as UserRepository from '../repositories/userRepository.js';

export const validateUniqueUser = async (userData) => {
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