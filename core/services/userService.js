import { findUserById } from '../repositories/userRepository.js';

const getUserById = async (id) => {
  return await findUserById(id);
};
export { getUserById };
