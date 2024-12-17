import { APIGatewayEvent, Context } from 'aws-lambda';

export const hello = async (event: APIGatewayEvent, context: Context) => {
  console.log(event, context);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello world!",
    }),
  };
};
