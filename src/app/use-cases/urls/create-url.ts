import { Url } from 'src/app/entities/url';
import { UrlsRepository } from 'src/app/repositories/urls.repository';

interface CreateUrlRequest {
  userId: string;
  originalUrl: string;
}

interface CreateUrlResponse {
  url: Url;
}

export class CreateUrl {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    userId,
    originalUrl,
  }: CreateUrlRequest): Promise<CreateUrlResponse> {
    const url = new Url({
      userId,
      url: originalUrl,
    });

    await this.urlsRepository.create(url);

    return { url };
  }
}
