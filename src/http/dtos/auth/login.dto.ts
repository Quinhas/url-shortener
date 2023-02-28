import { ApplicationValidator } from '@helpers/application-validator';

interface Login {
  email: string;
  password: string;
}

interface Body {
  [string: string]: unknown;
}

export class LoginDTO {
  parse({ email, password }: Body): Login {
    ApplicationValidator.isRequired({ fieldName: 'E-mail', value: email });
    ApplicationValidator.isEmail({ fieldName: 'E-mail', value: email });
    ApplicationValidator.isRequired({ fieldName: 'Password', value: password });

    return {
      email,
      password,
    } as Login;
  }
}
