import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { getDynamoDBOptions } from '../../utils/aws';

export default class DynamoDBFactory {
  private static instance: DynamoDBFactory;
  private client: DynamoDBDocumentClient;

  private constructor() {
    const options = getDynamoDBOptions();
    const dynamoConnection = new DynamoDBClient(options);
    this.client = DynamoDBDocumentClient.from(dynamoConnection);
  }

  public static create(): DynamoDBFactory {
    if (!DynamoDBFactory.instance) {
      DynamoDBFactory.instance = new DynamoDBFactory();
    }

    return DynamoDBFactory.instance;
  }

  public getDynamoDBClient(): DynamoDBDocumentClient {
    return this.client;
  }
}