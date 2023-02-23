import { User } from 'src/app/entities/user';
import { InMemoryUsersRepository } from 'src/app/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { CreateUser } from './create-user';
import { GetUserById } from './get-user-by-id';

describe('Get User By Id', () => {
  it('should be able to get a user by id', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const getUserById = new GetUserById(usersRepository);

    const { user: _user } = await createUser.execute({
      email: 'user@example.com',
      password: 'test1234',
    });

    const { user } = await getUserById.execute({ id: _user.id });

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe('user@example.com');
  });
});
