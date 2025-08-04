import { Contract, TransactionReceipt } from "ethers";
import { TRAMITE_CONTRACT } from "../../core/configs/contract.js";
import { Tramite, Movimiento } from "../../application/dtos/contract.dto.js";

export default class TramiteService {
  constructor(private contract: Contract = TRAMITE_CONTRACT) {}

  /**
   * Obtiene los datos de un trámite por su ID.
   * @param idTramite El ID del trámite a buscar.
   * @returns Una promesa que resuelve a un objeto Tramite.
   */
  async getTramite(idTramite: number): Promise<Tramite> {
    try {
      const tramiteData = await this.contract.getTramite(idTramite);
      return {
        creador: tramiteData.creador,
        tipoTramite: tramiteData.tipoTramite.toString(),
        seguimiento: tramiteData.seguimiento.map((id: any) => id.toString()),
      };
    } catch (error: any) {
      console.error(`Error en getTramite(${idTramite}):`, error.message);
      throw new Error("No se pudo obtener el trámite desde el contrato.");
    }
  }

  /**
   * Obtiene el historial completo de movimientos de un trámite.
   * @param idTramite El ID del trámite.
   * @returns Una promesa que resuelve a un array de Movimientos.
   */
  async getHistorial(idTramite: number): Promise<Movimiento[]> {
    try {
      const historialData = await this.contract.getHistorial(idTramite);
      return historialData.map((mov: any) => ({
        emisor: mov.emisor,
        receptor: mov.receptor,
        timestamp: new Date(Number(mov.timestamp) * 1000).toISOString(),
        documentos: mov.documentos.map((docId: any) => docId.toString()),
      }));
    } catch (error: any) {
      console.error(`Error en getHistorial(${idTramite}):`, error.message);
      throw new Error("No se pudo obtener el historial del trámite.");
    }
  }

  // --- MÉTODOS DE ESCRITURA (TRANSACCIONES) ---

  /**
   * Crea un nuevo trámite.
   * @param tipoTramite El tipo de trámite a crear.
   * @param receptor La dirección del destinatario inicial.
   * @param documentos Un array de IDs de documentos.
   * @returns Una promesa que resuelve al recibo de la transacción.
   */
  async crearTramite(tipoTramite: number, receptor: string, documentos: number[]): Promise<TransactionReceipt | null> {
    try {
      const tx = await this.contract.crearTramite(tipoTramite, receptor, documentos);
      const receipt: TransactionReceipt | null = await tx.wait();
      console.log("Transacción 'crearTramite' minada. Hash:", receipt?.hash);
      return receipt;
    } catch (error: any) {
      console.error("Error en crearTramite:", error.message);
      throw new Error("La transacción para crear el trámite falló.");
    }
  }

  /**
   * Crea un nuevo movimiento para un trámite existente.
   * @param idTramite El ID del trámite.
   * @param receptor La dirección del nuevo receptor.
   * @param documentos Un array de IDs de documentos.
   * @returns Una promesa que resuelve al recibo de la transacción.
   */
  async crearMovimiento(idTramite: number, receptor: string, documentos: number[]): Promise<TransactionReceipt | null> {
    try {
      const tx = await this.contract.crearMovimiento(idTramite, receptor, documentos);
      const receipt: TransactionReceipt | null = await tx.wait();
      console.log("Transacción 'crearMovimiento' minada. Hash:", receipt?.hash);
      return receipt;
    } catch (error: any) {
      console.error("Error en crearMovimiento:", error.message);
      throw new Error("La transacción para crear el movimiento falló.");
    }
  }

  /**
   * Elimina el último movimiento de un trámite.
   * @param idTramite El ID del trámite a modificar.
   * @returns Una promesa que resuelve al recibo de la transacción.
   */
  async quitarMovimiento(idTramite: number): Promise<TransactionReceipt | null> {
    try {
      const tx = await this.contract.quitarMovimiento(idTramite);
      const receipt: TransactionReceipt | null = await tx.wait();
      console.log("Transacción 'quitarMovimiento' minada. Hash:", receipt?.hash);
      return receipt;
    } catch (error: any) {
      console.error("Error en quitarMovimiento:", error.message);
      throw new Error("La transacción para quitar el movimiento falló.");
    }
  }
}
/* 
// Patrón Singleton: Exportamos una única instancia de la clase para ser usada en toda la app.
export const tramiteService = new TramiteService(); */
