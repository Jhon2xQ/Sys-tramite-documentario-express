import { injectable, inject } from "inversify";
import jsonwebtoken from "jsonwebtoken";
import { TYPES } from "../../core/IoC/ioc.types.js";
import { USER_TOKEN_TTL, JWT_SECRET_KEY } from "../../core/configs/config.js";
import { UserRepository } from "../../infraestructure/persistence/user.repository.js";
import { LoginUserDTO, PublicUserDTO } from "../dtos/user.dto.js";
import bcrypt from "bcrypt";

@injectable()
export default class AccountService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async userLogin(iuser: LoginUserDTO): Promise<string | null> {
    const foundUser = await this.userRepository.getByUsername(iuser.username);
    if (!foundUser) return null;
    const { username, password } = foundUser;
    const isMatchedPassword = await bcrypt.compare(iuser.password, password);
    if (!isMatchedPassword) return null;
    return this.generateToken({ username });
  }

  async getProfile(iusername: string): Promise<PublicUserDTO | null> {
    const foundUser = await this.userRepository.getByUsername(iusername);
    if (!foundUser) return null;
    const { username } = foundUser;
    return { username };
  }

  generateToken(user: PublicUserDTO): string {
    return jsonwebtoken.sign(user, JWT_SECRET_KEY, { expiresIn: USER_TOKEN_TTL });
  }
}
