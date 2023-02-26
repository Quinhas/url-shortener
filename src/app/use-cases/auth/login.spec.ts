import { User } from '@app/entities/user';
import { ApplicationException } from '@exceptions/application-exception';
import { InMemoryUsersRepository } from '@tests/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { Login } from './login';
import { SignUp } from './signup';

describe('Login', () => {
  it('should be able to login', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const signUp = new SignUp(usersRepository);
    const login = new Login(usersRepository);

    await signUp.execute({
      email: 'user@example.com',
      password: 'test123',
    });

    const { user } = await login.execute({
      email: 'user@example.com',
      password: 'test123',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should not be able to login with non-existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const login = new Login(usersRepository);

    expect(
      login.execute({
        email: 'user@example.com',
        password: 'test1234',
      })
    ).rejects.toBeInstanceOf(ApplicationException);
  });
});
