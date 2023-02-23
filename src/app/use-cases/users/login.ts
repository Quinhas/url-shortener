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
      throw new Error('User not found.');
    }

    if (!user.comparePassword(password)) {
      throw new Error('Invalid password.');
    }

    return { user };
  }
}
