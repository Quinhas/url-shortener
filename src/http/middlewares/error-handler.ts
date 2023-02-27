import { ApplicationException } from '@exceptions/application-exception';
import { randomUUID } from 'crypto';
import dayjs from 'dayjs';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { prismaClient } from 'src/database/prismaClient';

export const errorHandler: ErrorRequestHandler = async (
  err: ApplicationException | Error | unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApplicationException) {
    if (err?.statusCode === 500) {
      await prismaClient.exception.create({
        data: {
          id: randomUUID(),
          dateTime: dayjs().toDate(),
          exception: String(err),
          method: req.method,
          url: req.path,
          headers: req.headers ?? undefined,
          body: req.body ?? undefined,
          query: req.query ?? undefined,
          userId: req.userId ?? undefined,
        },
      });
      err.message = 'Unable to continue. Contact an administrator.';
    }
    return res
      .status(err.statusCode ?? 500)
      .json({ error: { message: err.message } });
  }

  await prismaClient.exception.create({
    data: {
      id: randomUUID(),
      dateTime: dayjs().toDate(),
      exception: String(err),
      method: req.method,
      url: req.path,
      headers: req.headers ?? undefined,
      body: req.body ?? undefined,
      query: req.query ?? undefined,
      userId: req.userId ?? undefined,
    },
  });

  return res.status(500).json({
    error: { message: 'Unable to continue. Contact an administrator.' },
  });
};
