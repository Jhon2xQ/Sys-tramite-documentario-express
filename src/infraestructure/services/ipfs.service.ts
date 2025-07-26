import { injectable } from "inversify";
import { IPFS_API_URL } from "../../core/configs/config.js";

interface IpfsAddResult {
  name: string;
  cid: string;
  size: string; // La API devuelve el tamaño como un string
}

@injectable()
export class IpfsService {
  constructor(private clusterApiUrl: string = IPFS_API_URL) {}

  public async addFile(fileBuffer: Buffer): Promise<string> {
    const formData = new FormData();
    formData.append("file", new Blob([fileBuffer]), "upload.bin");

    try {
      const response = await fetch(`${this.clusterApiUrl}/add`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del clúster (${response.status}): ${errorText}`);
      }

      // 2. Le decimos a TypeScript que el resultado de response.json() debe ser del tipo IpfsAddResult.
      //    Usamos "as" para hacer una aserción de tipo, ya que estamos seguros de la estructura.
      const result = (await response.json()) as IpfsAddResult;

      // 3. Ahora TypeScript sabe que result tiene una propiedad 'cid' de tipo string.
      //    El error desaparece y nuestro código es más seguro.
      return result.cid;
    } catch (error) {
      console.error("Error al intentar añadir el archivo a IPFS Cluster vía API REST:", error);
      throw new Error("Fallo al subir el archivo a IPFS.");
    }
  }
}
