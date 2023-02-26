import { Url } from '@app/entities/url';
import { InMemoryUrlsRepository } from '@tests/repositories/in-memory/in-memory-urls.repository';
import { describe, expect, it } from 'vitest';
import { CreateUrl } from './create-url';

describe('Create Url', () => {
  it('should be able to create a url', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const createUrl = new CreateUrl(urlsRepository);

    const originalUrl = 'https://github.com/Quinhas/url-shortener';

    const { url } = await createUrl.execute({
      userId: 'user-id',
      originalUrl,
    });

    expect(url).toBeInstanceOf(Url);
    expect(url.id.length).toBe(Number(process.env.HASH_LENGTH ?? 6));
  });
});
