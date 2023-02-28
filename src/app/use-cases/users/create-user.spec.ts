import { User } from '@app/entities/user';
import { ApplicationException } from '@exceptions/application-exception';
import { makeUser } from '@tests/factories/user.factory';
import { InMemoryUsersRepository } from '@tests/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { CreateUser } from './create-user';

describe('Create User', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute(makeUser());

    expect(user).toBeInstanceOf(User);
  }),
  it('should not be able to create a user with duplicate email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    await createUser.execute(makeUser());

    expect(createUser.execute(makeUser())).rejects.toBeInstanceOf(
      ApplicationException
    );
  });
});
