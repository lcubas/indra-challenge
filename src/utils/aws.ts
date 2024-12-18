import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

export const getDynamoDBOptions = (): DynamoDBClientConfig => {
  let options: DynamoDBClientConfig = {};

  if (process.env.IS_OFFLINE) {
    options = {
      endpoint: 'http://localhost:4566',
      credentials: {
        accessKeyId: 'MockAccessKeyId',
        secretAccessKey: 'MockSecretAccessKey'
      },
    };
  }

  return options;
};
