import { User } from 'src/app/entities/user';
import { InMemoryUsersRepository } from 'src/app/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { CreateUser } from './create-user';

describe('Create User', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute({
      email: 'user@example.com',
      password: 'test1234',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should not be able to create a user with duplicate email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    await createUser.execute({
      email: 'user@example.com',
      password: 'test1234',
    });

    expect(
      createUser.execute({
        email: 'user@example.com',
        password: 'test1234',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
