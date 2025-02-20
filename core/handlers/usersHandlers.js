import { getUsers, getUserById, createUser, updateUser, deleteUser, activateUser, deactivateUser } from "../controllers/users.js";
import { loginUser, changePassword } from "../controllers/auth.js";

export {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    activateUser,
    deactivateUser,
    loginUser,
    changePassword,
    updateUser,
};
