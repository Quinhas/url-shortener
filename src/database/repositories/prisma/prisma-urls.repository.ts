import { UrlsRepository } from '@app/repositories/urls.repository';
import { Url } from 'src/app/entities/url';
import { prismaClient } from 'src/database/prismaClient';
import { PrismaUrlMapper } from 'src/mappers/prisma/prisma-url.mapper';

export class PrismaUrlsRepository implements UrlsRepository {
  async findById(id: string): Promise<Url | null> {
    const url = await prismaClient.url.findUnique({ where: { id } });

    if (!url) {
      return null;
    }

    return PrismaUrlMapper.toDomain(url);
  }

  async store(url: Url): Promise<void> {
    const prismaUrl = PrismaUrlMapper.toPrisma(url);

    await prismaClient.url.create({ data: prismaUrl });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.url.delete({ where: { id } });
  }

  async deleteExpiredUrls(): Promise<number> {
    const { count } = await prismaClient.url.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });

    return count;
  }
}

export const prismaUrlsRepository = new PrismaUrlsRepository();
