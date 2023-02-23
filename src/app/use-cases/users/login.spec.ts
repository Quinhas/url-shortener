import { User } from 'src/app/entities/user';
import { InMemoryUsersRepository } from 'src/app/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { CreateUser } from './create-user';
import { Login } from './login';

describe('Login', () => {
  it('should be able to login', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const login = new Login(usersRepository);

    await createUser.execute({
      email: 'user@example.com',
      password: 'test123',
    });

    const { user } = await login.execute({
      email: 'user@example.com',
      password: 'test123',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should not be able to login with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);
    const login = new Login(usersRepository);

    await createUser.execute({
      email: 'user@example.com',
      password: 'test123',
    });

    expect(
      login.execute({
        email: 'user@example.com',
        password: 'test1234',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to login with non-existing user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const login = new Login(usersRepository);

    expect(
      login.execute({
        email: 'user@example.com',
        password: 'test1234',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});