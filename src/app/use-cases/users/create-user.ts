import { User } from 'src/app/entities/user';
import { UsersRepository } from 'src/app/repositories/users.repository';

interface CreateUserRequest {
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const alreadyExists = await this.usersRepository.findByEmail(email);

    if (alreadyExists) {
      throw new Error('User already exists');
    }

    const user = new User({
      email: email,
      password: password,
    });

    await this.usersRepository.create(user);

    return { user };
  }
}
