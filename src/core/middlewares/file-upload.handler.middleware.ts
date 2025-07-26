import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";

// --- CONFIGURACIÓN DE MULTER ---
// Se configura una sola vez y se reutiliza en los middlewares.

const multerConfig = multer({
  // 1. Almacenamiento: Se usa memoryStorage para tener los archivos como Buffers en RAM.
  storage: multer.memoryStorage(),

  // 2. Límites: Es una BUENA PRÁCTICA establecer límites para evitar ataques de denegación de servicio (DoS)
  //    al llenar la memoria del servidor con archivos demasiado grandes.
  limits: {
    // Tamaño máximo de cada archivo: 5 Megabytes.
    // Puedes ajustarlo según tus necesidades. 1024 bytes (1KB) * 1024 (1MB) * 5.
    fileSize: 1024 * 1024 * 5,
  },
});

// --- EL HANDLER O MIDDLEWARE ---
// Esta es una "función fábrica": una función que crea y devuelve otra función (el middleware real).

/**
 * Crea un middleware de Multer para gestionar la subida de múltiples archivos.
 * @param fieldName El nombre del campo del formulario (form field) que contendrá los archivos.
 * @returns Un middleware de Express configurado para procesar los archivos.
 */
export const handleMultipleFiles = (fieldName: string) => {
  // Devolvemos la función que Express realmente usará como middleware.
  // Esta función tiene acceso a `req`, `res`, y `next`.
  return (req: Request, res: Response, next: NextFunction) => {
    // Generamos el middleware específico de multer para el campo dado (`fieldName`).
    const upload = multerConfig.array(fieldName);

    // Ejecutamos el middleware de multer manualmente para poder capturar sus errores específicos.
    upload(req, res, (error) => {
      // --- Manejo de Errores de Multer ---

      if (error instanceof MulterError) {
        // Un error conocido de Multer ocurrió (ej. archivo demasiado grande, demasiados archivos, etc.).
        console.error(`Error de Multer en el campo '${fieldName}':`, error);

        if (error.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            success: false,
            message: "El archivo es demasiado grande. El límite es de 5MB.",
          });
        }

        // Puedes añadir más manejos para otros códigos de error de Multer aquí.
        return res.status(400).json({
          success: false,
          message: `Error al subir el archivo: ${error.message}`,
        });
      } else if (error) {
        // Un error desconocido o inesperado ocurrió.
        console.error("Error desconocido durante la subida del archivo:", error);
        return res.status(500).json({
          success: false,
          message: "Ocurrió un error inesperado en el servidor al procesar el archivo.",
        });
      }

      // Si no hubo errores, la subida fue exitosa.
      // `req.files` y `req.body` ya están poblados.
      // Pasamos el control al siguiente middleware en la cadena (tu controlador `saveDocuments`).
      next();
    });
  };
};
