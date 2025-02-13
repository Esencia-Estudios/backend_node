import { User } from '../models/User.js';

const findUserById = async (id) => {
  return await User.findByPk(id);
};

export { findUserById };
