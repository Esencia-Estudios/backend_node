import { changePasswordRequiredInCognito, loginUserAWS } from '../helpers/aws.js';
import * as authRepository from '../repositories/authRepository.js';
// import { AccessLog } from '../models/index.js';


export const login = async (loginData) => {
    try {
        const { username, password } = loginData;

        const userExistsInDB = await authRepository.checkUserInDatabase({ username, password });
        const authResponse = await loginUserAWS(username, password);

        if (authResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
            return { session: authResponse.Session, forceChangePassword: true };
        }

        // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // await AccessLog.create({
        //     userId: userExistsInDB.id,
        //     ipAddress: ip,
        //     accessedAt: new Date(),
        // });

        return {
            token: authResponse.AuthenticationResult,
            user: userExistsInDB.dataValues,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const forceChangePassword = async (data) => {
    try {
        const { username, session, newPassword } = data;
        await authRepository.checkUserInDatabase({ username });
        await changePasswordRequiredInCognito({ username, newPassword, session });
        await authRepository.changePasswordInDB({ username, newPassword });
        return "Password changed successfully";
    } catch (error) {
        throw error;
    }
}
