import { GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import DynamoDBFactory from './DynamoDBFactory';
import {
  DefaultDynamoDBItem,
  DynamoDBGetParams,
  DynamoDBPutParams,
  DynamoDBScanParams,
} from './types';

export default class DynamoDB {
  private static readonly dynamoDbclient =
    DynamoDBFactory.create().getDynamoDBClient();

  static async scan<T = DefaultDynamoDBItem>(params: DynamoDBScanParams) {
    try {
      const command = new ScanCommand(params);
      const { Items } = await this.dynamoDbclient.send(command);
      return Items as T[];
    } catch (error) {
      console.log(error);
    }
  }

  static async get<T = DefaultDynamoDBItem>(params: DynamoDBGetParams) {
    try {
      const command = new GetCommand(params);
      const { Item } = await this.dynamoDbclient.send(command);
      return Item as T;
    } catch (error) {
      console.log(error);
    }
  }

  static async put<T = DefaultDynamoDBItem>(params: DynamoDBPutParams<T>) {
    try {
      const command = new PutCommand(params);
      await this.dynamoDbclient.send(command);
    } catch (error) {
      console.error(error);
    }
  }
}
