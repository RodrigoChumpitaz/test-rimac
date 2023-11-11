import { APIGatewayProxyResult } from "aws-lambda";
import { ErrorResponse } from "../types/ErrorResponse";

export const fromError = (error: unknown): APIGatewayProxyResult => {
  const response: APIGatewayProxyResult = {
    statusCode: 500,
    body: JSON.stringify(error),
  };
  
  if (error instanceof Error) {
    const responseError = ErrorResponse.fromError(error);

    response.body = responseError.toJSON();
  }

  return response;
}