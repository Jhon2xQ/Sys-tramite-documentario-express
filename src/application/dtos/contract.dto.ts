export interface Tramite {
  creador: string;
  tipoTramite: string;
  seguimiento: string[];
}

export interface Movimiento {
  emisor: string;
  receptor: string;
  timestamp: string;
  documentos: string[];
}
