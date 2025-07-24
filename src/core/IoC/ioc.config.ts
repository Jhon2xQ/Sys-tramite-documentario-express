import { Container } from "inversify";
import { TYPES } from "./ioc.types";
import { UserRepository } from "../../infraestructure/persistence/user.repository";
import { AccountController } from "../../presentation/controllers/account.controller";
import AccountService from "../../application/services/account.service";

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<AccountService>(TYPES.AccountService).to(AccountService);
container.bind<AccountController>(TYPES.AccountController).to(AccountController);

export default container;
