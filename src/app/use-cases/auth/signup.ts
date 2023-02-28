import generateAccessToken from '@helpers/generate-access-token';
import { UsersRepository } from 'src/app/repositories/users.repository';
import { CreateUser } from '../users/create-user';

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
    const createUser = new CreateUser(this.usersRepository);
    const { user } = await createUser.execute({ email, password });

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
