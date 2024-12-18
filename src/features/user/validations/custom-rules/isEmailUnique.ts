import DynamoDB from '../../../../services/dynamo-db/DynamoDB';
import { USERS_TABLE } from '../../constants';


export const isEmailUnique = async (email: string): Promise<Boolean> => {
  const params = {
    TableName: USERS_TABLE,
    FilterExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };
  const items = await DynamoDB.scan(params);

  return !items || items.length === 0;
};