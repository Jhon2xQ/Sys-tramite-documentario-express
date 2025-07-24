import { User } from "../entities/user.entity";

export interface IUserRepository {
  getByUsername(username: string): Promise<User | null>;
}
