import { injectable } from "inversify";
import { prisma } from "../../core/configs/prisma.js";
import { User } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/repositories/iUser.repository.js";
@injectable()
export class UserRepository implements IUserRepository {
  async getByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username },
    });
  }
}
