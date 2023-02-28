import { Url } from '@app/entities/url';

export class UrlViewModel {
  static toHTTP(url: Url) {
    return {
      id: url.id,
      userId: url.userId,
      url: url.originalUrl,
      created_at: url.createdAt,
      expires_at: url.expiresAt,
    };
  }
}
