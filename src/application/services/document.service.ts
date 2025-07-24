import { injectable } from "inversify";
import { DocumentRepository } from "../../infraestructure/persistence/document.repository";
import { CreateDocumentDTO, PublicDocumentDTO } from "../dtos/document.dto";
import { inject } from "inversify";
import { TYPES } from "../../core/IoC/ioc.types";

@injectable()
export default class DocumentService {
  constructor(@inject(TYPES.DocumentRepository) private documentRepository: DocumentRepository) {}

  async getByHash(ihash: string): Promise<PublicDocumentDTO | null> {
    const foundDocument = await this.documentRepository.getByHash(ihash);
    if (!foundDocument) return null;
    const { hash, name, mimeType } = foundDocument;
    return { hash, name, mimeType };
  }

  async createDocument(document: CreateDocumentDTO): Promise<PublicDocumentDTO> {
    const createdDocument = await this.documentRepository.create(document);
    const { hash, name, mimeType } = createdDocument;
    return { hash, name, mimeType };
  }
}
