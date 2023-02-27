import {
  ApplicationException,
  HttpCode,
} from '@exceptions/application-exception';
import generateAccessToken from '@helpers/generate-access-token';
import { hashPassword } from '@helpers/hash-password';
import { User } from 'src/app/entities/user';
import { UsersRepository } from 'src/app/repositories/users.repository';

interface SignUpRequest {
  email: string;
  password: string;
}

interface SignUpResponse {
  accessToken: string;
}

export class SignUp {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: SignUpRequest): Promise<SignUpResponse> {
    const alreadyExists = await this.usersRepository.findByEmail(email);

    if (alreadyExists) {
      throw new ApplicationException({
        message: 'User already exists',
        statusCode: HttpCode.BAD_REQUEST,
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      email: email,
      password: hashedPassword,
    });

    await this.usersRepository.store(user);

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
