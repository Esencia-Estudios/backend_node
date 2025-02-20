// import bcrypt from 'bcryptjs';
// import { UserModel } from "../models/index.js";
import { ResponseHelper as response } from "../helpers/response.js";
// import AWS from 'aws-sdk';
// import crypto from 'crypto';
import { loginUserHelper } from "../helpers/aws.js";



const loginUser = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body);

    const response = await loginUserHelper(username, password);
    console.log(response);
    return response;

  } catch (error) {
    return response.badRequest("ERROR:" + error);
  }
};


// const cognito = new AWS.CognitoIdentityServiceProvider();

// const calculateSecretHash = (username, clientId, clientSecret) => {
//   const hmac = crypto.createHmac('sha256', clientSecret);
//   hmac.update(username + clientId);
//   return hmac.digest('base64');
// };

// const loginUser = async (event) => {
//   try {
//     const { username, password } = JSON.parse(event.body);

//     const user = await UserModel.findOne({
//       where: { username }
//     });

//     if (!user) {
//       return response.unauthorized({
//         message: "Credenciales incorrectas"
//       });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return response.unauthorized({
//         message: "Credenciales incorrectas"
//       });
//     }

//     const params = {
//       AuthFlow: 'USER_PASSWORD_AUTH',
//       ClientId: process.env.COGNITO_CLIENT_ID,
//       AuthParameters: {
//         USERNAME: username,
//         PASSWORD: password,
//         SECRET_HASH: calculateSecretHash(username, process.env.COGNITO_CLIENT_ID, process.env.COGNITO_CLIENT_SECRET),
//       }
//     };

//     const cognitoResponse = await cognito.initiateAuth(params).promise();

//     const token = cognitoResponse.AuthenticationResult.IdToken;

//     return response.success(
//       {
//         message: "Credenciales correctas",
//         user: {
//           id: user.user_id,
//           username: user.username,
//           email: user.email,
//         },
//         token
//       }
//     );

//   } catch (error) {
//     return response.badRequest("ERROR:" + error);
//   }
// };

export {
  loginUser
};
