import { Url } from 'src/app/entities/url';
import { UrlsRepository } from 'src/app/repositories/urls.repository';

interface CreateUrlRequest {
  userId: string;
  originalUrl: string;
  expiresAt?: Date;
}

interface CreateUrlResponse {
  url: Url;
}

export class CreateUrl {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({
    userId,
    originalUrl,
    expiresAt,
  }: CreateUrlRequest): Promise<CreateUrlResponse> {
    const url = new Url({
      userId,
      url: originalUrl,
      expiresAt,
    });

    await this.urlsRepository.store(url);

    return { url };
  }
}
