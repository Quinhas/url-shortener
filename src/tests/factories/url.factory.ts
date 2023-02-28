import { Url, UrlProps } from '@app/entities/url';
import { randomUUID } from 'crypto';

type Override = Partial<UrlProps>;

export function makeUrl(override: Override = {}) {
  return new Url({
    url: 'https://github.com/Quinhas/url-shortener',
    userId: randomUUID(),
    ...override,
  });
}
