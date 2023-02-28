import { User } from '@app/entities/user';
import { makeUser } from '@tests/factories/user.factory';
import { InMemoryUsersRepository } from '@tests/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { CreateUser } from './create-user';
import { GetUserById } from './get-user-by-id';

describe('Get User By Id', () => {
  it('should be able to get a user by id', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const getUserById = new GetUserById(usersRepository);

    const _user = makeUser();

    await createUser.execute(_user);

    const { user } = await getUserById.execute({ id: _user.id });

    expect(user).toBeInstanceOf(User);
    expect(user.email).toBe(_user.email);
  });
});
