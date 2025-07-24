import { injectable } from "inversify";
import { prisma } from "../../core/configs/prisma";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repositories/iUser.repository";
@injectable()
export class UserRepository implements IUserRepository {
  async getByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username },
    });
  }
}
