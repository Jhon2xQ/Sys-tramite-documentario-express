export interface CreateDocumentDTO {
  hash: string;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface DocumentDTO {
  name: string;
  size: number;
  mimeType: string;
  content: Buffer;
}

export interface PublicDocumentDTO {
  hash: string;
  originalname: string;
  mimetype: string;
  size: number;
  //viewLink: string;
}
