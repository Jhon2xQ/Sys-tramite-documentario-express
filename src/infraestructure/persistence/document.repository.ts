import { injectable } from "inversify";
import { CreateDocumentDTO } from "../../application/dtos/document.dto";
import { prisma } from "../../core/configs/prisma";
import { Document } from "../../domain/entities/document.entity";
import { IDocumentRepository } from "../../domain/repositories/iDocument.repository";

@injectable()
export class DocumentRepository implements IDocumentRepository {
  async getByHash(hash: string): Promise<Document | null> {
    return await prisma.document.findUnique({
      where: { hash },
    });
  }

  async create(document: CreateDocumentDTO): Promise<Document> {
    return await prisma.document.create({
      data: document,
    });
  }
}
