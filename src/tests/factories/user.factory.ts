import { User, UserProps } from '@app/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    email: 'test@example.com',
    password: 'password',
    ...override,
  });
}
