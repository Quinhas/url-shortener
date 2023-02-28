import { UsersRepository } from '@app/repositories/users.repository';
import { User } from 'src/app/entities/user';
import { prismaClient } from 'src/database/prismaClient';
import { PrismaUserMapper } from 'src/mappers/prisma/prisma-user.mapper';

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async store(user: User): Promise<void> {
    const prismaUser = PrismaUserMapper.toPrisma(user);

    await prismaClient.user.create({ data: prismaUser });
  }
}

export const prismaUsersRepository = new PrismaUsersRepository();
