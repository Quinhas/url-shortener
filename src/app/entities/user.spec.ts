import { expect, it } from 'vitest';
import { User } from './user';

it('should be able to create an user', () => {
  const user = new User({
    email: 'test@example.com',
    password: '12345',
  });

  expect(user).toBeInstanceOf(User);
  expect(user.email).toBe('test@example.com');
});
