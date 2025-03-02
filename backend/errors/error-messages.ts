import { HttpException, HttpStatus } from '@nestjs/common';

export const errorMessages = {
  NOT_FOUND: 'Not Found',
  BAD_REQUEST: 'Bad Request',
  SERVER_ERROR: (error: any) => {
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal server error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
      {
        cause: error,
      },
    );
  },
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  INVALID_CREDENTIALS: 'Invalid Credentials',
  INVALID_TOKEN: 'Invalid Token',
};
