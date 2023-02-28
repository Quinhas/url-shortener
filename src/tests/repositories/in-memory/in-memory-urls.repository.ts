import { UrlsRepository } from '@app/repositories/urls.repository';
import { resetDateTime } from '@helpers/reset-date-time';
import dayjs from 'dayjs';
import { Url } from 'src/app/entities/url';

export class InMemoryUrlsRepository implements UrlsRepository {
  public items: Url[] = [];

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

  async deleteExpiredUrls(): Promise<number> {
    let count = this.items.length;
    this.items = this.items.filter((item) => {
      if (item.expiresAt >= resetDateTime(dayjs().toDate())) {
        return item;
      }
    });
    count -= this.items.length;
    return count;
  }
}
