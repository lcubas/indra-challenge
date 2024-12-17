import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export default class DynamoDbFactory {
  private static instance: DynamoDbFactory;
  private client: DynamoDBDocumentClient;

  private constructor() {
    const dynamoConnection = new DynamoDBClient();
    this.client = DynamoDBDocumentClient.from(dynamoConnection);
  }

  public static create(): DynamoDbFactory {
    if (!DynamoDbFactory.instance) {
      DynamoDbFactory.instance = new DynamoDbFactory();
    }

    return DynamoDbFactory.instance;
  }

  public getDynamoDbClient(): DynamoDBDocumentClient {
    return this.client;
  }
}