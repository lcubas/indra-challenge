import DynamoDB from '../../../services/dynamo-db/DynamoDB';
import { User } from '../entities/User';
import { USERS_TABLE } from '../constants';

export class UserService {
  static tableName = USERS_TABLE;

  static async getUsers(): Promise<User[]> {
    const params = {
      TableName: UserService.tableName,
    };

    return await DynamoDB.scan<User>(params) as User[];
  }

  static async getUserById(userId: string): Promise<User> {
    const params = {
      TableName: UserService.tableName,
      Key: { userId },
    };

    return await DynamoDB.get(params) as User;
  }

  static async createUser(user: any): Promise<void> {
    const params = {
      TableName: UserService.tableName,
      Item: user,
    };

    await DynamoDB.put(params);
  }
}
