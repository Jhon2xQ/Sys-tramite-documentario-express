import { CreateDocumentDTO } from "../../application/dtos/document.dto.js";
import { Document } from "../entities/document.entity.js";

export interface IDocumentRepository {
  getById(id: number): Promise<Document | null>;
  getByHash(hash: string): Promise<Document | null>;
  existByHash(hash: string): Promise<boolean>;
  create(document: CreateDocumentDTO): Promise<Document>;
}
