import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

interface UrlProps {
  url: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

export class Url {
  private readonly _id: string;
  private props: UrlProps;

  constructor(
    props: Replace<UrlProps, { createdAt?: Date; expiresAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? nanoid(Number(process.env.HASH_LENGTH ?? 6));
    this.props = {
      ...props,
      createdAt: dayjs().toDate(),
      expiresAt: dayjs().add(1, 'month').toDate(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get originalUrl(): string {
    return this.props.url;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get expiresAt(): Date {
    return this.props.expiresAt;
  }
}
