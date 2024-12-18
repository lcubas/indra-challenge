import { HttpStatus } from '../enums/HttpStatus';
import HttpException from './HttpException';

export default class UnprocessableEntityException extends HttpException {
  constructor(
    message = 'Unprocessable entity',
    public errors: Record<string, string[]>,
  ) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, message);
  }
}