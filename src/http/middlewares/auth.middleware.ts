import { GetUserById } from '@app/use-cases/users/get-user-by-id';
import { prismaUsersRepository } from '@database/repositories/prisma/prisma-users.repository';
import {
  ApplicationException,
  HttpCode,
} from '@exceptions/application-exception';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp?: number;
}

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new ApplicationException({
      message: 'Authorization is required.',
      statusCode: HttpCode.UNAUTHORIZED,
    });
  }

  const token = authorization.replace('Bearer', '').trim();

  if (!process.env.JWT_SECRET) {
    throw new ApplicationException({
      message: 'JWT_SECRET is not defined.',
      statusCode: HttpCode.INTERNAL_SERVER_ERROR,
    });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    const { id } = data;

    const getUserById = new GetUserById(prismaUsersRepository);
    await getUserById.execute({ id });

    request.userId = id;
    return next();
  } catch {
    throw new ApplicationException({
      message: 'Cannot proceed. User logged out.',
      statusCode: HttpCode.UNAUTHORIZED,
    });
  }
}
