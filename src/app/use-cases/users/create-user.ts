import {
  ApplicationException,
  HttpCode,
} from '@exceptions/application-exception';
import { hashPassword } from '@helpers/hash-password';
import { User } from 'src/app/entities/user';
import { UsersRepository } from 'src/app/repositories/users.repository';

interface CreateUserRequest {
  id?: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const alreadyExists = await this.usersRepository.findByEmail(email);

    if (alreadyExists) {
      throw new ApplicationException({
        message: 'User already exists',
        statusCode: HttpCode.BAD_REQUEST,
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User(
      {
        email: email,
        password: hashedPassword,
      },
      id
    );

    await this.usersRepository.store(user);

    return { user };
  }
}
