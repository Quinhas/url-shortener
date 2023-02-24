import { Url } from '../entities/url';

export interface UrlsRepository {
  findById(id: string): Promise<Url | null>;
  store(url: Url): Promise<void>;
}
