import {
  ApplicationException,
  HttpCode,
} from '@exceptions/application-exception';
import jwt from 'jsonwebtoken';

type TokenPayload = {
  id: string;
  email: string;
};

export default function generateAccessToken(payload: TokenPayload) {
  if (!process.env.JWT_SECRET) {
    throw new ApplicationException({
      message: 'JWT_SECRET is not defined.',
      statusCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
  }

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '48h',
  });
  return accessToken;
}
