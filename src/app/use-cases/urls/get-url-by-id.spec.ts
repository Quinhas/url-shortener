import { Url } from 'src/app/entities/url';
import { InMemoryUrlsRepository } from 'src/app/repositories/in-memory/in-memory-urls.repository';
import { describe, expect, it } from 'vitest';
import { CreateUrl } from './create-url';
import { GetUrlById } from './get-url-by-id';

describe('Get URL By Id', () => {
  it('should be able to get a url by id', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const createUrl = new CreateUrl(urlsRepository);
    const getUrlById = new GetUrlById(urlsRepository);

    const originalUrl = 'https://github.com/Quinhas/url-shortener';

    const { url: _url } = await createUrl.execute({
      originalUrl,
      userId: 'user-id'
    });

    const { url } = await getUrlById.execute({ id: _url.id });

    expect(url).toBeInstanceOf(Url);
    expect(url.originalUrl).toBe(originalUrl);
  });
});
