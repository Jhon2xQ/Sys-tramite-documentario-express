import { Router } from "express";
import { AccountController } from "../presentation/controllers/account.controller.js";
import asyncHandler from "../core/middlewares/async.handler.middleware.js";
import { validate } from "../core/middlewares/validation.middleware.js";
import { userLoginSchema } from "../presentation/schemas/account.schema.js";
import { verifyToken } from "../core/middlewares/account.middleware.js";
import container from "../core/IoC/ioc.config.js";
import { TYPES } from "../core/IoC/ioc.types.js";

const accountRouter = Router();

const accountController = container.get<AccountController>(TYPES.AccountController);

accountRouter.get("/profile", verifyToken, asyncHandler(accountController.profile));
accountRouter.post("/login", validate(userLoginSchema), asyncHandler(accountController.login));
accountRouter.post("/logout", verifyToken, accountController.logout);

export default accountRouter;
