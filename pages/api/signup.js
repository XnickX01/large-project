import { json } from 'micro';
import AWS from 'aws-sdk';

export default async function handler(request, response) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  const cognito = new AWS.CognitoIdentityServiceProvider();

  const { username, password } = await json(request);

  const signUpParams = {
    ClientId: process.env.COGNITO_CLIENT_ID, // Replace with your Cognito User Pool client id
    Username: username,
    Password: password,
  };

  try {
    const signUpResponse = await cognito.signUp(signUpParams).promise();
    response.status(200).json({ message: 'Sign up successful!', signUpResponse });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}