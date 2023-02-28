import { makeUser } from '@tests/factories/user.factory';
import { InMemoryUsersRepository } from '@tests/repositories/in-memory/in-memory-users.repository';
import { describe, expect, it } from 'vitest';
import { SignUp } from './signup';

describe('Sign Up', () => {
  it('should be able to sign up', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const signUp = new SignUp(usersRepository);

    const { accessToken } = await signUp.execute(makeUser());

    expect(accessToken).toBeTypeOf('string');
  });
});
