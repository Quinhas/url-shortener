import dayjs from 'dayjs';
import { UrlsRepository } from 'src/app/repositories/urls.repository';

export class DeleteExpiredUrls {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute(): Promise<void> {
    const count = await this.urlsRepository.deleteExpiredUrls();
    console.log(
      `${dayjs().format(
        'DD/MM/YYYY - HH:mm:ss'
      )} - ${count} expired urls deleted.`
    );
  }
}
