import { Url } from '@app/entities/url';
import { makeUrl } from '@tests/factories/url.factory';
import { InMemoryUrlsRepository } from '@tests/repositories/in-memory/in-memory-urls.repository';
import { describe, expect, it } from 'vitest';
import { CreateUrl } from './create-url';
import { GetUrlById } from './get-url-by-id';

describe('Get URL By Id', () => {
  it('should be able to get a url by id', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const createUrl = new CreateUrl(urlsRepository);
    const getUrlById = new GetUrlById(urlsRepository);

    const _url = makeUrl();

    await createUrl.execute(_url);

    const { url } = await getUrlById.execute({ id: _url.id });

    expect(url).toBeInstanceOf(Url);
    expect(url.originalUrl).toBe(_url.originalUrl);
  });
});
