import { UsersRepository } from '@app/repositories/users.repository';
import { User } from 'src/app/entities/user';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

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

  async store(user: User): Promise<void> {
    this.items.push(user);
  }
}
