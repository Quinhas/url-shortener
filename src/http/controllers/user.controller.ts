import { GetUserById } from '@app/use-cases/users/get-user-by-id';
import { prismaUsersRepository } from '@database/repositories/prisma/prisma-users.repository';
import { ApplicationValidator } from '@helpers/application-validator';
import { Request, Response } from 'express';
import { UserViewModel } from '../view-models/user.view-model';

export class UserController {
  async findById(req: Request, res: Response) {
    const { id } = req.params;

    ApplicationValidator.isRequired({ fieldName: 'ID', value: id });
    ApplicationValidator.isUUID({ fieldName: 'ID', value: id });

    const getUserById = new GetUserById(prismaUsersRepository);

    const { user } = await getUserById.execute({ id });

    res.status(200).json(UserViewModel.toHTTP(user));
  }
}

export const userController = new UserController();
