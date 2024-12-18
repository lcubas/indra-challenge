import { ZodSchema } from 'zod';
import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import UnprocessableEntityException from '../exceptions/UnprocessableEntityException';

export const requestValidatorMiddleware = (
  schema: ZodSchema
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  return {
    before: async (request) => {
      try {
        const zodValidationResult = await schema.safeParseAsync(
          JSON.parse(request.event.body || '{}')
        );

        if (!zodValidationResult.success) {
          const errors = zodValidationResult.error.errors.reduce(
            (acc, error) => {
              const errorKey = error.path[0];

              if (!acc[errorKey]) {
                acc[errorKey] = [];
              }

              acc[errorKey].push(error.message);

              return acc;
            },
            {}
          );

          throw new UnprocessableEntityException(
            'Unprocessable Entity',
            errors
          );
        }
      } catch (error) {
        // If validation fails, throw an error
        request.response = {
          statusCode: 422,
          body: JSON.stringify({
            message: error.message,
            errors: error.errors,
          }),
        };
      }
    },
  };
};
