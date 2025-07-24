import { CreateDocumentDTO } from "../../application/dtos/document.dto";
import { Document } from "../entities/document.entity";

export interface IDocumentRepository {
  getByHash(hash: string): Promise<Document | null>;
  create(document: CreateDocumentDTO): Promise<Document>;
}
