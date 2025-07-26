import { injectable } from "inversify";
import { DocumentRepository } from "../../infraestructure/persistence/document.repository";
import { CreateDocumentDTO, DocumentDTO, PublicDocumentDTO } from "../dtos/document.dto";
import { inject } from "inversify";
import { TYPES } from "../../core/IoC/ioc.types";

@injectable()
export default class DocumentService {
  constructor(@inject(TYPES.DocumentRepository) private documentRepository: DocumentRepository) {}

  async getByHash(ihash: string): Promise<PublicDocumentDTO | null> {
    const foundDocument = await this.documentRepository.getByHash(ihash);
    if (!foundDocument) return null;
    const { hash, originalname, mimetype, size } = foundDocument;
    return { hash, originalname, mimetype, size };
  }

  async createDocument(document: CreateDocumentDTO): Promise<PublicDocumentDTO> {
    const createdDocument = await this.documentRepository.create(document);
    const { hash, originalname, mimetype, size } = createdDocument;
    return { hash, originalname, mimetype, size };
  }

  async saveDocuments(documents: Express.Multer.File[]): Promise<void> {
    for (const document of documents) {
      const { originalname, size, mimetype, buffer } = document;
      const hash = "abc"; //integracion con ipfs
      await this.createDocument({ hash, originalname, mimetype, size });
    }
  }
}
