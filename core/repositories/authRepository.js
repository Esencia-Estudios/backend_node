import { UserModel } from '../models/index.js'
import bcrypt from 'bcryptjs';
import { loginUserAWS, checkUserInCognito, changePasswordRequieredInCognito } from '../helpers/aws.js';
import { ResponseHelper as response } from '../helpers/response.js';

const checkUserInDatabase = async ({ username, password }) => {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) throw new Error("User does not exist in database")
    if (password) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Password is incorrect")
    }
    if (user || password && isPasswordValid && user) return user
};

const changePasswordInDB = async ({ username, newPassword }) => {
    try {
        const user = await UserModel.findOne({ where: { username } });
        await user.update({ password: newPassword });
        await UserModel.findOne({ where: { username } });
    } catch (error) {
        return response.badRequest("Error changing password in database" + error);
    }
}


export const login = async (loginData) => {
    const { username, password } = loginData;

    // Verifies user in Cognito
    const userExistsInCognito = await checkUserInCognito(username);
    if (!userExistsInCognito) throw new Error('User does not exist in Cognito');

    // Verified user in data base
    const userExistsInDB = await checkUserInDatabase({ username, password });

    const authResponse = await loginUserAWS(username, password);

    if (authResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        return response.success({ session: authResponse.Session, forceChangePassword: true }, 'New Password Required',);
    }

    return response.success({
        token: authResponse.AuthenticationResult,
        user: userExistsInDB.dataValues,
    });
}

export const forceChangePassword = async (data) => {
    const { username, session, newPassword } = data;
    await checkUserInDatabase({ username });
    await changePasswordRequieredInCognito({ username, newPassword, session });
    await changePasswordInDB({ username, newPassword });
    return response.success("Password changed successfully");
}