import { ApplicationValidator } from '@helpers/application-validator';

interface SignUp {
  email: string;
  password: string;
}

interface Body {
  [string: string]: unknown;
}

export class SignUpDTO {
  parse({ email, password }: Body): SignUp {
    ApplicationValidator.isRequired({ fieldName: 'E-mail', value: email });
    ApplicationValidator.isEmail({ fieldName: 'E-mail', value: email });
    ApplicationValidator.isRequired({ fieldName: 'Password', value: password });

    return {
      email,
      password,
    } as SignUp;
  }
}
