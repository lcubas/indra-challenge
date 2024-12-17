import type {
  GetCommandInput,
  PutCommandInput,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";

export type BaseDynamoDbParams = {
  TableName: string;
};

export type DefaultDynamoDbItem = Record<string, any>;

export type DynamoDbScanParams = ScanCommandInput & BaseDynamoDbParams;

export type DynamoDbGetParams = GetCommandInput & BaseDynamoDbParams;

export type DynamoDbPutParams<T> = PutCommandInput &
  BaseDynamoDbParams & {
    Item: T;
  };