import { resetDateTime } from '@helpers/reset-date-time';
import { makeUrl } from '@tests/factories/url.factory';
import { InMemoryUrlsRepository } from '@tests/repositories/in-memory/in-memory-urls.repository';
import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { CreateUrl } from './create-url';
import { DeleteExpiredUrls } from './delete-expired-urls';

describe('Delete Expired Urls', () => {
  it('should be able to delete all expired urls', async () => {
    const urlsRepository = new InMemoryUrlsRepository();
    const createUrl = new CreateUrl(urlsRepository);
    const deleteExpiredUrls = new DeleteExpiredUrls(urlsRepository);

    const yesterday = resetDateTime(dayjs().subtract(1, 'day').toDate());
    const today = resetDateTime(dayjs().toDate());
    const tomorrow = resetDateTime(dayjs().add(1, 'day').toDate());

    await createUrl.execute(makeUrl({ expiresAt: yesterday }));
    await createUrl.execute(makeUrl({ expiresAt: today }));
    await createUrl.execute(makeUrl({ expiresAt: tomorrow }));

    const { count } = await deleteExpiredUrls.execute();

    expect(count).toEqual(1);
    expect(urlsRepository.items.length).toEqual(2);
    expect(urlsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ expiresAt: today }),
        expect.objectContaining({ expiresAt: tomorrow }),
      ])
    );
  });
});
