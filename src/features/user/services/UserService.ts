import DynamoDb from '../../../services/dynamo-db/DynamoDb';
import { User } from '../entities/User';
import { USERS_TABLE } from '../constants';

export class UserService {
  static tableName = USERS_TABLE;

  static async getUsers(): Promise<User[]> {
    const params = {
      TableName: UserService.tableName,
    };

    return await DynamoDb.scan<User>(params) as User[];
  }

  static async getUserById(userId: string): Promise<User> {
    const params = {
      TableName: UserService.tableName,
      Key: { userId },
    };

    return await DynamoDb.get(params) as User;
  }

  static async createUser(user: any): Promise<void> {
    const params = {
      TableName: UserService.tableName,
      Item: user,
    };

    await DynamoDb.put(params);
  }
}
