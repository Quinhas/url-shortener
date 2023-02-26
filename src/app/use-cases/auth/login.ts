import {
  ApplicationException,
  HttpCode
} from '@exceptions/application-exception';
import { compare } from 'bcrypt';
import { User } from 'src/app/entities/user';
import { UsersRepository } from 'src/app/repositories/users.repository';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
}

export class Login {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: LoginRequest): Promise<LoginResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ApplicationException({
        message: 'User not found.',
        statusCode: HttpCode.NOT_FOUND,
      });
    }

    const matchPassword = await compare(password, user.password);
    if (!matchPassword) {
      throw new ApplicationException({
        message: 'Invalid password.',
        statusCode: HttpCode.BAD_REQUEST,
      });
    }

    return { user };
  }
}
