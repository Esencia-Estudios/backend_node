import { UserRepository } from "../repositories/userRepository";

export const getUsersService = async () => {
    return await UserRepository.findAll();
};
