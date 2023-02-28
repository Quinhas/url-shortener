import { UrlsRepository } from 'src/app/repositories/urls.repository';

interface DeleteExpiredUrlsResponse {
  count: number;
}

export class DeleteExpiredUrls {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute(): Promise<DeleteExpiredUrlsResponse> {
    const count = await this.urlsRepository.deleteExpiredUrls();
    return { count };
  }
}
