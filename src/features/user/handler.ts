import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserService } from './services/UserService';

export const getUsers = async () => {
  const users = await UserService.getUsers();

  return {
    statusCode: 200,
    body: JSON.stringify({ data: users }),
  };
}

export const getUserById = async (event: APIGatewayProxyEvent) => {
  const { userId } = event.pathParameters || {};

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'userId is required' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data: null }),
  };
}

export const createUser = async (event: APIGatewayProxyEvent) => {
  const userData = JSON.parse(event.body || '');

  if (!userData) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User is required' }),
    };
  }

  const createdUser = await UserService.createUser(userData);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: createdUser }),
  };
}
