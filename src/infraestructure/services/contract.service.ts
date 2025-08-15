import { Contract, TransactionReceipt } from "ethers";
import { TRAMITE_CONTRACT } from "../../core/configs/contract.js";
import { Tramite, Movimiento } from "../../application/dtos/contract.dto.js";

export default class ContractService {
  constructor(private contract: Contract = TRAMITE_CONTRACT) {}

  /**
   * Crea un nuevo trámite.
   * @param tipoTramite El tipo de trámite a crear.
   * @param receptor La dirección del destinatario.
   * @param documentos Un array de Hash de documentos
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
