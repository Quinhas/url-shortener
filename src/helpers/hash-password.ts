import { hash } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const hashPassword = await hash(password, 10);

  return hashPassword;
}
