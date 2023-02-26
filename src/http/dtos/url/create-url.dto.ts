import { ApplicationValidator } from '@helpers/application-validator';

interface CreateUrl {
  url: string;
}

interface Body {
  [string: string]: unknown;
}

export class CreateUrlDTO {
  static parse({ url }: Body): CreateUrl {
    ApplicationValidator.isRequired({ fieldName: 'Url', value: url });

    return {
      url,
    } as CreateUrl;
  }
}
