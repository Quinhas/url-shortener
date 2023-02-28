import { expect, it } from 'vitest';
import { Url } from './url';

it('should be able to create an shorted url', () => {
  const url = new Url({
    url: 'original-url',
    userId: 'user-id',
  });

  expect(url).toBeInstanceOf(Url);
  expect(url.originalUrl).toBe('original-url');
});
