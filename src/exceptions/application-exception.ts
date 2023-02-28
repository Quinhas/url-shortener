export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  CREATED = 201,
}

interface ApplicationExceptionProps {
  statusCode: number;
  message: string;
}

export class ApplicationException extends Error {
  statusCode?: number = 500;
  message: string;

  constructor({ statusCode = 500, message }: ApplicationExceptionProps) {
    super();
    Object.setPrototypeOf(this, ApplicationException.prototype);
    Object.bind(ApplicationException);

    this.statusCode = statusCode;
    this.message = message;
  }
}
