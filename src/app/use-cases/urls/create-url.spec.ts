import { Url } from '@app/entities/url';
import { makeUrl } from '@tests/factories/url.factory';
import { InMemoryUrlsRepository } from '@tests/repositories/in-memory/in-memory-urls.repository';
import { describe, expect, it } from 'vitest';
import { CreateUrl } from './create-url';

describe('Create Url', () => {
  it('should be able to create a url', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const createUrl = new CreateUrl(urlsRepository);

    const { url } = await createUrl.execute(makeUrl());

    expect(url).toBeInstanceOf(Url);
    expect(url.id.length).toBe(Number(process.env.HASH_LENGTH ?? 6));
  });
});
