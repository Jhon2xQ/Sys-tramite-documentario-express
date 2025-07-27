import { User } from "../entities/user.entity.js";

export interface IUserRepository {
  getByUsername(username: string): Promise<User | null>;
}
