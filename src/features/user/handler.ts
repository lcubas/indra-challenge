import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserService } from './services/UserService';

export const createUser = async (event: APIGatewayProxyEvent) => {
  const { body } = event;
  const user = JSON.parse(body || '');

  if (!user) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User is required' }),
    };
  }

  const createdUser = await UserService.createUser(user);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: createdUser }),
  };
}

export const getAllUsers = async (event: APIGatewayProxyEvent) => {
  const users = await UserService.getAllUsers();

  return {
    statusCode: 200,
    body: JSON.stringify({ data: users }),
  };
}