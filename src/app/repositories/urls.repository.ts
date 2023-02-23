import { Url } from '../entities/url';

export interface UrlsRepository {
  findById(id: string): Promise<Url | null>;
  create(url: Url): Promise<void>;
}
