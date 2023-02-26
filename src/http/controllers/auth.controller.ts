import { Login } from '@app/use-cases/auth/login';
import { SignUp } from '@app/use-cases/auth/signup';
import { prismaUsersRepository } from '@database/repositories/prisma/prisma-users.repository';
import { Request, Response } from 'express';
import { LoginDTO } from '../dtos/auth/login.dto';
import { SignUpDTO } from '../dtos/auth/signup.dto';
import { UserViewModel } from '../view-models/user.view-model';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = new LoginDTO().parse(req.body);

    const login = new Login(prismaUsersRepository);

    const { user } = await login.execute({ email, password });

    res.status(200).json(UserViewModel.toHTTP(user));
  }

  async signup(req: Request, res: Response) {
    const { email, password } = new SignUpDTO().parse(req.body);

    const signUp = new SignUp(prismaUsersRepository);

    const { user } = await signUp.execute({ email, password });

    res.status(201).json(UserViewModel.toHTTP(user));
  }
}

export const authController = new AuthController();
