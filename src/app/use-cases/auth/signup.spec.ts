import { User } from '@app/entities/user';
import { ApplicationException } from '@exceptions/application-exception';
import { InMemoryUsersRepository } from '@tests/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { SignUp } from './signup';

describe('Sign Up', () => {
  it('should be able to sign up', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const signUp = new SignUp(usersRepository);

    const { user } = await signUp.execute({
      email: 'user@example.com',
      password: 'test1234',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('should not be able to sign up a user with duplicate email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const signUp = new SignUp(usersRepository);

    await signUp.execute({
      email: 'user@example.com',
      password: 'test1234',
    });

    expect(
      signUp.execute({
        email: 'user@example.com',
        password: 'test1234',
      })
    ).rejects.toBeInstanceOf(ApplicationException);
  });
});
