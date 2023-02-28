import { Url as RawUrl } from '@prisma/client';
import { Url } from 'src/app/entities/url';

export class PrismaUrlMapper {
  static toPrisma(url: Url) {
    return {
      id: url.id,
      userId: url.userId,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      url: url.originalUrl,
    };
  }

  static toDomain(raw: RawUrl): Url {
    return new Url(
      {
        url: raw.url,
        userId: raw.userId,
        createdAt: raw.createdAt,
        expiresAt: raw.expiresAt,
      },
      raw.id
    );
  }
}
