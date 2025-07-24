import { Container } from "inversify";
import { TYPES } from "./ioc.types";
import { UserRepository } from "../../infraestructure/persistence/user.repository";
import { AccountController } from "../../presentation/controllers/account.controller";
import AccountService from "../../application/services/account.service";
import { DocumentRepository } from "../../infraestructure/persistence/document.repository";
import DocumentService from "../../application/services/document.service";
import { DocumentController } from "../../presentation/controllers/document.controller";

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<AccountService>(TYPES.AccountService).to(AccountService);
container.bind<AccountController>(TYPES.AccountController).to(AccountController);

container.bind<DocumentRepository>(TYPES.DocumentRepository).to(DocumentRepository);
container.bind<DocumentService>(TYPES.DocumentService).to(DocumentService);
container.bind<DocumentController>(TYPES.DocumentController).to(DocumentController);

export default container;
