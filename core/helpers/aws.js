import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  AdminGetUserCommand,
  RespondToAuthChallengeCommand,
  AdminSetUserPasswordCommand,
  AdminEnableUserCommand,
  AdminDisableUserCommand,
  AdminUpdateUserAttributesCommand,
  AdminDeleteUserCommand,
  AdminCreateUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const client = new CognitoIdentityProviderClient({
  region: process.env.REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const calculateSecretHash = (username, clientId, clientSecret) => {
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(username + clientId);
  return hmac.digest("base64");
};

export const loginUserAWS = async (username, password) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: calculateSecretHash(username, process.env.COGNITO_CLIENT_ID, process.env.COGNITO_CLIENT_SECRET),
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await client.send(command);

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const changePasswordRequiredInCognito = async ({
  username,
  newPassword,
  session,
}) => {
  const params = {
    ChallengeName: "NEW_PASSWORD_REQUIRED",
    ClientId: process.env.COGNITO_CLIENT_ID,
    ChallengeResponses: {
      USERNAME: username,
      NEW_PASSWORD: newPassword,
      SECRET_HASH: calculateSecretHash(
        username,
        process.env.COGNITO_CLIENT_ID,
        process.env.COGNITO_CLIENT_SECRET
      ),
    },
    Session: session,
  };

  try {
    const command = new RespondToAuthChallengeCommand(params);
    await client.send(command);
  } catch (error) {
    console.error("Error change password in cognito:", error);
    throw error;
  }
};

export const updatePasswordInCognito = async ({ username, newPassword }) => {
  try {
    const command = new AdminSetUserPasswordCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      Password: newPassword,
      Permanent: true,
    });
    await client.send(command);
  } catch (error) {
    console.error("Error updating password in Cognito:", error);
    throw error;
  }
};

export const enableOrDisableUserInCognito = async ({ username, is_active }) => {
  try {
    const command = is_active
      ? new AdminEnableUserCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: username,
      })
      : new AdminDisableUserCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: username,
      });
    await client.send(command);
  } catch (error) {
    console.error("Error enabling or disabling user in Cognito:", error);
    throw error;
  }
};

export const checkUserInCognito = async (username) => {
  try {
    const command = new AdminGetUserCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
    });
    await client.send(command);
    return true;
  } catch (error) {
    console.error("Usuario no encontrado en Cognito:", error);
    return false;
  }
};

export const createUserInCognito = async ({ email, username, password }) => {
  try {
    const command = new AdminCreateUserCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      UserAttributes: [{ Name: "email", Value: email }],
      TemporaryPassword: password,
      MessageAction: "SUPPRESS",
    });

    const response = await client.send(command);
    return response.User;
  } catch (error) {
    console.error("Error creating user in Cognito:", error);
    throw error;
  }
};

export const updateUserInCognito = async ({
  currentUsername,
  newUsername,
  email,
  password,
  is_active,
}) => {
  try {
    const updateAttributes = [];

    // Update Email if provided
    if (email) {
      updateAttributes.push({ Name: "email", Value: email });
      updateAttributes.push({ Name: "email_verified", Value: "false" });
    }

    // Update Username if provided (recreating the user if necessary)
    // if (newUsername && newUsername !== currentUsername) {
    //     console.log(`Actualizando username de ${currentUsername} a ${newUsername}`);

    //     // Crear un nuevo usuario con el nuevo username
    //     const createCommand = new AdminCreateUserCommand({
    //         UserPoolId: process.env.COGNITO_USER_POOL_ID,
    //         Username: newUsername,
    //         UserAttributes: updateAttributes,
    //         MessageAction: 'SUPPRESS',
    //     });
    //     await client.send(createCommand);

    //     // Eliminar el usuario antiguo
    //     const deleteCommand = new AdminDeleteUserCommand({
    //         UserPoolId: process.env.COGNITO_USER_POOL_ID,
    //         Username: currentUsername,
    //     });
    //     await client.send(deleteCommand);

    //     return { message: 'Username actualizado en Cognito' };
    // }

    // Execute attribute update if there are changes
    if (updateAttributes.length > 0) {
      const updateCommand = new AdminUpdateUserAttributesCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: currentUsername,
        UserAttributes: updateAttributes,
      });
      await client.send(updateCommand);
    }

    // Update password if provided
    if (password) {
      updatePasswordInCognito({
        username: currentUsername,
        newPassword: password,
      });
    }

    // Enable or disable user based on is_active
    if (typeof is_active === "boolean") {
      await enableOrDisableUserInCognito({
        username: currentUsername,
        is_active,
      });
    }

    return true;
  } catch (error) {
    throw new Error("Error updating user in Cognito: " + error.message);
  }
};

export const deleteUserInCognito = async (username) => {
  try {
    const command = new AdminDeleteUserCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
    });

    const response = await client.send(command);
    console.log(`Usuario ${username} eliminado de Cognito.`);
    return response;
  } catch (error) {
    console.error("Error al eliminar usuario de Cognito:", error);
    throw error;
  }
};

export const getBucketObject = async ({ bucket, key }) => {
  try {
    const s3 = new AWS.S3();
    const objectLink = await s3.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: key,
    });
    return objectLink;
  } catch (err) {
    console.error("Error al obtener objeto de S3:", err);
    return null;
  }
};
