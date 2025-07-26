import { Router } from "express";
import container from "../core/IoC/ioc.config.js";
import { DocumentController } from "../presentation/controllers/document.controller.js";
import { TYPES } from "../core/IoC/ioc.types.js";
import asyncHandler from "../core/middlewares/async.handler.middleware.js";
import { handleMultipleFiles } from "../core/middlewares/file-upload.handler.middleware.js";

const documentRouter = Router();

const documentController = container.get<DocumentController>(TYPES.DocumentController);

documentRouter.get("/:hash", asyncHandler(documentController.getDocument));
documentRouter.post("/", handleMultipleFiles("archivos"), asyncHandler(documentController.saveDocuments));

export default documentRouter;
