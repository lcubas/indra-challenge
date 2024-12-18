import type {
  GetCommandInput,
  PutCommandInput,
  ScanCommandInput,
} from '@aws-sdk/lib-dynamodb';

export type BaseDynamoDBParams = {
  TableName: string;
};

export type DefaultDynamoDBItem = Record<string, any>;

export type DynamoDBScanParams = ScanCommandInput & BaseDynamoDBParams;

export type DynamoDBGetParams = GetCommandInput & BaseDynamoDBParams;

export type DynamoDBPutParams<T> = PutCommandInput &
  BaseDynamoDBParams & {
    Item: T;
  };