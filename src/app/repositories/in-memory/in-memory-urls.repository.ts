import { Url } from 'src/app/entities/url';
import { UrlsRepository } from '../urls.repository';

export class InMemoryUrlsRepository implements UrlsRepository {
  private items: Url[] = [];

  async findById(id: string): Promise<Url | null> {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return item;
  }

  async store(url: Url): Promise<void> {
    this.items.push(url);
  }
}
