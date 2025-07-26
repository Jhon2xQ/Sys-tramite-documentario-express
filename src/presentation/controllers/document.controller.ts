import { Request, Response } from "express";
import DocumentService from "../../application/services/document.service.js";
import CustomError from "../../core/exceptions/custom.error.js";
import { injectable } from "inversify";
import { inject } from "inversify";
import { TYPES } from "../../core/IoC/ioc.types.js";

@injectable()
export class DocumentController {
  constructor(@inject(TYPES.DocumentService) private documentService: DocumentService) {}

  getDocument = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const foundDocument = await this.documentService.getByHash(req.params.hash);
    if (!foundDocument) throw new CustomError("El hash del documento no existe", 404);
    return res.status(200).json({
      success: true,
      data: foundDocument,
    });
  };

  saveDocuments = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const archivos = req.files as Express.Multer.File[];
    await this.documentService.saveDocuments(archivos);
    return res.status(200).json({
      success: true,
      message: "Archivos recibidos correctamente.",
    });
  };
}
