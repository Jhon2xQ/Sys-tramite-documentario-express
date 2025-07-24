import { Request, Response } from "express";
import DocumentService from "../../application/services/document.service";
import CustomError from "../../core/exceptions/custom.error";
import { injectable } from "inversify";
import { inject } from "inversify";
import { TYPES } from "../../core/IoC/ioc.types";

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

  createDocument = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const createdDocument = await this.documentService.createDocument(req.body);
    return res.status(200).json({
      success: true,
      message: "documento creado con exito",
      data: createdDocument,
    });
  };
}
