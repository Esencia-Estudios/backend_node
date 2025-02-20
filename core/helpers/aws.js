import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
import crypto from 'crypto';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

const calculateSecretHash = (username, clientId, clientSecret) => {
    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(username + clientId);
    return hmac.digest('base64');
};

const loginUserHelper = async (username, password) => {
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
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
        return response?.AuthenticationResult;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

const getBucketObject = async ({ bucket, key }) => {
    try {
        const s3 = new AWS.S3();
        const objectLink = await s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: key,
        });
        return objectLink;
    } catch (err) {
        return null;
    }
};

export { loginUserHelper, getBucketObject };
