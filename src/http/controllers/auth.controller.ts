import { Login } from '@app/use-cases/auth/login';
import { SignUp } from '@app/use-cases/auth/signup';
import { prismaUsersRepository } from '@database/repositories/prisma/prisma-users.repository';
import { Request, Response } from 'express';
import { LoginDTO } from '../dtos/auth/login.dto';
import { SignUpDTO } from '../dtos/auth/signup.dto';

export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = new LoginDTO().parse(req.body);

    const login = new Login(prismaUsersRepository);

    const { accessToken } = await login.execute({ email, password });

    res.status(200).json({ access_token: accessToken });
  }

  async signup(req: Request, res: Response) {
    const { email, password } = new SignUpDTO().parse(req.body);

    const signUp = new SignUp(prismaUsersRepository);

    const { accessToken } = await signUp.execute({ email, password });

    res.status(201).json({ access_token: accessToken });
  }
}

export const authController = new AuthController();
