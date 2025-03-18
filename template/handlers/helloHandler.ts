import { getUsers } from "../controllers/UserController";

export const getUsersHandler = async (event: any) => {
    const users = await getUsers();
    return {
        statusCode: 200,
        body: JSON.stringify(users),
    };
};
