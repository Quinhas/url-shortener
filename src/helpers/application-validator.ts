import {
  ApplicationException,
  HttpCode
} from '@exceptions/application-exception';

interface FunctionValidatorProps {
  fieldName: string;
  value?: unknown;
}

export class ApplicationValidator {
  static isRequired({ fieldName, value }: FunctionValidatorProps) {
    if (value === undefined || value === null) {
      throw new ApplicationException({
        message: `${fieldName} is required.`,
        statusCode: HttpCode.BAD_REQUEST,
      });
    }
  }

  static isEmail({ fieldName, value }: FunctionValidatorProps) {
    const regex = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
    );

    if (
      typeof value !== 'string' ||
      value.trim().length === 0 ||
      !regex.test(value)
    ) {
      throw new ApplicationException({
        message: `${fieldName} is an invalid e-mail.`,
        statusCode: HttpCode.BAD_REQUEST,
      });
    }
  }

  static isUUID({ fieldName, value }: FunctionValidatorProps) {
    const regex = new RegExp(
      /^[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i
    );

    if (
      typeof value !== 'string' ||
      value.trim().length === 0 ||
      !regex.test(value)
    ) {
      throw new ApplicationException({
        message: `${fieldName} is an invalid UUID.`,
        statusCode: HttpCode.BAD_REQUEST,
      });
    }
  }
}
