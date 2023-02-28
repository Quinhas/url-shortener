import { User } from '../entities/user';

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  store(user: User): Promise<void>;
}
