import { injectable } from "inversify";
import { CreateDocumentDTO } from "../../application/dtos/document.dto.js";
import { prisma } from "../../core/configs/prisma.js";
import { Document } from "../../domain/entities/document.entity.js";
import { IDocumentRepository } from "../../domain/repositories/iDocument.repository.js";

@injectable()
export class DocumentRepository implements IDocumentRepository {
  async getById(id: number): Promise<Document | null> {
    return await prisma.document.findUnique({
      where: { id },
    });
  }

  async getByHash(hash: string): Promise<Document | null> {
    return await prisma.document.findUnique({
      where: { hash },
    });
  }

  async existByHash(hash: string): Promise<boolean> {
    const document = await prisma.document.findFirst({
      where: { hash },
      select: {
        id: true,
      },
    });
    return !!document;
  }

  async create(document: CreateDocumentDTO): Promise<Document> {
    return await prisma.document.create({
      data: document,
    });
  }
}
