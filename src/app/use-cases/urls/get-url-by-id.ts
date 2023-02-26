import { ApplicationException, HttpCode } from '@exceptions/application-exception';
import { Url } from 'src/app/entities/url';
import { UrlsRepository } from 'src/app/repositories/urls.repository';

interface GetUrlByIdRequest {
  id: string;
}

interface GetUrlByIdResponse {
  url: Url;
}

export class GetUrlById {
  constructor(private urlsRepository: UrlsRepository) {}

  async execute({ id }: GetUrlByIdRequest): Promise<GetUrlByIdResponse> {
    const url = await this.urlsRepository.findById(id);

    if (!url) {
      throw new ApplicationException({
        message: 'URL not found.',
        statusCode: HttpCode.NOT_FOUND,
      });
    }

    return { url };
  }
}
