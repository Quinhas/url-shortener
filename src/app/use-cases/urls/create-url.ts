import { Url } from 'src/app/entities/url';
import { UrlsRepository } from 'src/app/repositories/urls.repository';

interface CreateUrlRequest {
  id?: string;
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
    id,
    userId,
    originalUrl,
    expiresAt,
  }: CreateUrlRequest): Promise<CreateUrlResponse> {
    const url = new Url(
      {
        userId,
        url: originalUrl,
        expiresAt,
      },
      id
    );

    await this.urlsRepository.store(url);

    return { url };
  }
}
