import {
  ApplicationException,
  HttpCode
} from '@exceptions/application-exception';
import { User } from 'src/app/entities/user';
import { UsersRepository } from 'src/app/repositories/users.repository';

interface GetUserByIdRequest {
  id: string;
}

interface GetUserByIdResponse {
  user: User;
}

export class GetUserById {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ApplicationException({
        message: 'User not found.',
        statusCode: HttpCode.NOT_FOUND,
      });
    }

    return { user };
  }
}
