import { Container } from "inversify";
import { TYPES } from "./ioc.types.js";
import { UserRepository } from "../../infraestructure/persistence/user.repository.js";
import { AccountController } from "../../presentation/controllers/account.controller.js";
import AccountService from "../../application/services/account.service.js";
import { DocumentRepository } from "../../infraestructure/persistence/document.repository.js";
import DocumentService from "../../application/services/document.service.js";
import { DocumentController } from "../../presentation/controllers/document.controller.js";
import { IpfsService } from "../../infraestructure/services/ipfs.service.js";

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<AccountService>(TYPES.AccountService).to(AccountService);
container.bind<AccountController>(TYPES.AccountController).to(AccountController);

container.bind<DocumentRepository>(TYPES.DocumentRepository).to(DocumentRepository);
container.bind<DocumentService>(TYPES.DocumentService).to(DocumentService);
container.bind<DocumentController>(TYPES.DocumentController).to(DocumentController);

container.bind<IpfsService>(TYPES.IpfsService).to(IpfsService).inSingletonScope();

export default container;
