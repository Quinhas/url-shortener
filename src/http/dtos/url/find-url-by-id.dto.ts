import { ApplicationValidator } from '@helpers/application-validator';

interface FindUrlById {
  id: string;
}

interface Body {
  [string: string]: unknown;
}

export class FindUrlByIdDTO {
  static parse({ id }: Body): FindUrlById {
    ApplicationValidator.isRequired({ fieldName: 'ID', value: id });

    return {
      id,
    } as FindUrlById;
  }
}
