import { randomUUID } from 'crypto';

interface UserProps {
  email: string;
  password: string;
}

export class User {
  private readonly _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id || randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  public comparePassword(password: string): boolean {
    return password === this.props.password;
  }
}
