import { ApplicationValidator } from '@helpers/application-validator';

interface DeleteUrl {
  id: string;
}

interface Body {
  [string: string]: unknown;
}

export class DeleteUrlDTO {
  static parse({ id }: Body): DeleteUrl {
    ApplicationValidator.isRequired({ fieldName: 'ID', value: id });

    return {
      id,
    } as DeleteUrl;
  }
}
