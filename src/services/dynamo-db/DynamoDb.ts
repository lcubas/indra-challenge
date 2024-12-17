import { GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import DynamoDbFactory from './DynamoDbFactory';
import {
  DefaultDynamoDbItem,
  DynamoDbGetParams,
  DynamoDbPutParams,
  DynamoDbScanParams,
} from './types';

export default class DynamoDb {
  private static readonly dynamoDbclient =
    DynamoDbFactory.create().getDynamoDbClient();

  static async scan<T = DefaultDynamoDbItem>(params: DynamoDbScanParams) {
    try {
      const command = new ScanCommand(params);
      const { Items } = await this.dynamoDbclient.send(command);
      return Items as T[];
    } catch (error) {
      console.log(error);
    }
  }

  static async get<T = DefaultDynamoDbItem>(params: DynamoDbGetParams) {
    try {
      const command = new GetCommand(params);
      const { Item } = await this.dynamoDbclient.send(command);
      return Item as T;
    } catch (error) {
      console.log(error);
    }
  }

  static async put<T = DefaultDynamoDbItem>(params: DynamoDbPutParams<T>) {
    try {
      const command = new PutCommand(params);
      await this.dynamoDbclient.send(command);
    } catch (error) {
      console.error(error);
    }
  }
}
