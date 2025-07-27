import { injectable } from "inversify";
import { IpfsAddResult } from "../../application/dtos/ipfs-result.dto.js";
import { IPFS_CLUSTER_API_URL } from "../../core/configs/config.js";

@injectable()
export class IpfsService {
  constructor(private clusterApiUrl: string = IPFS_CLUSTER_API_URL) {}

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

      const result = (await response.json()) as IpfsAddResult;
      return result.cid;
    } catch (error) {
      console.error("Error al intentar añadir el archivo a IPFS Cluster vía API REST:", error);
      throw new Error("Fallo al subir el archivo a IPFS.");
    }
  }
}
