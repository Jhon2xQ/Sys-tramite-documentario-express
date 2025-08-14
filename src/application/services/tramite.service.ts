import ContractService from "../../infraestructure/services/contract.service.js";
import { CreateTramite } from "../dtos/tramite.dto.js";
import DocumentService from "./document.service.js";

export default class TramiteService {
  constructor(private documentService: DocumentService, private contractService: ContractService) {}

  async createTramite(data: CreateTramite, documents: Express.Multer.File[]): Promise<void> {
    const documentsHash = await this.documentService.saveDocuments(documents);
    const tx = await this.contractService.crearTramite(data.idTramite, data.receptor, documentsHash);
  }
}
