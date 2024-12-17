import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserService } from './services/UserService';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';

const getUsers = async () => {
  const users = await UserService.getUsers();

  return {
    statusCode: 200,
    body: JSON.stringify({ data: users }),
  };
}

const getUserById = async (event: APIGatewayProxyEvent) => {
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

const createUser = async (event: APIGatewayProxyEvent) => {
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

export const getUsersHandler = middy(getUsers);
export const getUserByIdHandler = middy(getUserById);
export const createUserHandler = middy()
  .use(jsonBodyParser())
  .handler(createUser);
