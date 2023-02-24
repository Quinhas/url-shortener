import { User as RawUser } from '@prisma/client';
import { User } from 'src/app/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        email: raw.email,
        password: raw.password,
      },
      raw.id
    );
  }
}
