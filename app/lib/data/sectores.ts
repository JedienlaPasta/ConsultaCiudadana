"use server";
import { connectToDB } from "../utils/db-connection";

type Sector = {
  sector_name: string;
};

// Sectors
export async function getSectors(): Promise<Sector[]> {
  const defaultSectors: Sector[] = [];

  try {
    const pool = await connectToDB();
    if (!pool) {
      console.warn("No se pudo establecer conexión con la base de datos");
      return defaultSectors;
    }

    const sectorRequest = pool.request();
    const sectorResult = await sectorRequest.query(
      "SELECT sector FROM sectores",
    );

    if (sectorResult.recordset.length === 0) {
      console.warn("No se encontraron sectores");
      return defaultSectors;
    }

    const sectors = sectorResult.recordset.map((row) => ({
      sector_name: row.sector,
    }));

    return sectors;
  } catch (error) {
    console.error("Error al obtener detalles de la encuesta:", error);
    return defaultSectors;
  }
}
