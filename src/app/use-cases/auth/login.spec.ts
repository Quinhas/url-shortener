import { ApplicationException } from '@exceptions/application-exception';
import { makeUser } from '@tests/factories/user.factory';
import { InMemoryUsersRepository } from '@tests/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { CreateUser } from '../users/create-user';
import { Login } from './login';

describe('Login', () => {
  it('should be able to login', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const login = new Login(usersRepository);

    const user = makeUser();

    await createUser.execute(user);

    const { accessToken } = await login.execute({
      email: user.email,
      password: user.password,
    });

    expect(accessToken).toBeTypeOf('string');
  });

  it('should not be able to login with non-existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const login = new Login(usersRepository);

    expect(login.execute(makeUser())).rejects.toBeInstanceOf(
      ApplicationException
    );
  });
});
