import { User } from 'src/app/entities/user';
import { UsersRepository } from '../users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async findByEmail(email: string): Promise<User | null> {
    const item = this.items.find((item) => item.email === email);

    if (!item) {
      return null;
    }

    return item;
  }

  async create(user: User): Promise<void> {
    this.items.push(user);
  }
}