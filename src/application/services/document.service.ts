import { injectable } from "inversify";
import { inject } from "inversify";
import { TYPES } from "../../core/IoC/ioc.types.js";
import { DocumentRepository } from "../../infraestructure/persistence/document.repository.js";
import { IpfsService } from "../../infraestructure/services/ipfs.service.js";
import { IPFS_KUBO_GATEWAY_URL } from "../../core/configs/config.js";
import { PublicDocumentDTO } from "../dtos/document.dto.js";

@injectable()
export default class DocumentService {
  constructor(
    @inject(TYPES.DocumentRepository) private documentRepository: DocumentRepository,
    @inject(TYPES.IpfsService) private ipfsService: IpfsService
  ) {}

  async getById(id: number): Promise<PublicDocumentDTO | null> {
    const foundDocument = await this.documentRepository.getById(id);
    if (!foundDocument) return null;
    const { hash, originalname, mimetype, size } = foundDocument;
    const viewlink = `${IPFS_KUBO_GATEWAY_URL}${hash}`;
    return { hash, originalname, mimetype, size, viewlink };
  }

  async getByHash(ihash: string): Promise<PublicDocumentDTO | null> {
    const foundDocument = await this.documentRepository.getByHash(ihash);
    if (!foundDocument) return null;
    const { hash, originalname, mimetype, size } = foundDocument;
    const viewlink = `${IPFS_KUBO_GATEWAY_URL}${hash}`;
    return { hash, originalname, mimetype, size, viewlink };
  }

  async saveDocuments(documents: Express.Multer.File[]): Promise<void> {
    for (const document of documents) {
      const { originalname, size, mimetype, buffer } = document;
      const hash = await this.ipfsService.addFile(buffer);
      const success = await this.documentRepository.existByHash(hash);
      if (!success) await this.documentRepository.create({ hash, originalname, mimetype, size });
    }
  }
}
