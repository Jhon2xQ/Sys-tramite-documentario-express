import { Router } from "express";
import container from "../core/IoC/ioc.config";
import { DocumentController } from "../presentation/controllers/document.controller";
import { TYPES } from "../core/IoC/ioc.types";
import asyncHandler from "../core/middlewares/async.handler.middleware";
import { handleMultipleFiles } from "../core/middlewares/file-upload.handler.middleware";

const documentRouter = Router();

const documentController = container.get<DocumentController>(TYPES.DocumentController);

documentRouter.get("/:hash", asyncHandler(documentController.getDocument));
documentRouter.post("/", handleMultipleFiles("archivos"), asyncHandler(documentController.saveDocuments));

export default documentRouter;
