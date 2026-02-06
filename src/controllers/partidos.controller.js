import { prisma } from "../libs/prisma.js";

export class PartidosController {
  static async createPartido(req, res) {
    try {
      const { fecha, rival, competencia, hora, lugar } = req.body;
      const partido = await prisma.partido.create({
        data: {
          fecha: new Date(fecha),
          hora,
          lugar,
          rival,
          competencia,
        },
      });
      res.send("Partido creado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error al crear el partido" });
    }
  }
  static async getPartidos(req, res) {
    try {
      const partidos = await prisma.partido.findMany();
      res.json(partidos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los partidos" });
    }
  }

  static async getPartidoById(req, res) {
    try {
      const { id } = req.params;
      const partido = await prisma.partido.findUnique({
        where: { id: parseInt(id) },
        include: {
          convocados: { include: { jugador: true } },
        },
      });
      if (!partido) {
        return res.status(404).json({ error: "Partido no encontrado" });
      }
      res.json(partido);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el partido" });
    }
  }

  /**
   * PATCH /partidos/:id/finalizar
   * Marca el partido como finalizado y crea el registro de estadísticas del partido.
   * Solo después de finalizar se pueden registrar estadísticas por jugador (y solo de convocados).
   */
  static async finalizarPartido(req, res) {
    try {
      const { id } = req.params;
      const partidoId = parseInt(id);
      const { goles_a_favor = 0, goles_en_contra = 0 } = req.body;

      const partido = await prisma.partido.findUnique({
        where: { id: partidoId },
      });
      if (!partido) {
        return res.status(404).json({ error: "Partido no encontrado" });
      }
      if (partido.finalizado) {
        return res.status(400).json({
          error: "El partido ya está finalizado",
        });
      }

      await prisma.$transaction([
        prisma.partido.update({
          where: { id: partidoId },
          data: { finalizado: true },
        }),
        prisma.estadisticaPartido.create({
          data: {
            partidoId,
            goles_a_favor: Number(goles_a_favor) || 0,
            goles_en_contra: Number(goles_en_contra) || 0,
            asistencias: 0,
            tarjetas_amarillas: 0,
            tarjetas_rojas: 0,
          },
        }),
      ]);

      const partidoActualizado = await prisma.partido.findUnique({
        where: { id: partidoId },
        include: {
          convocados: { include: { jugador: true } },
          estadisticasPartido: true,
        },
      });
      res.json(partidoActualizado);
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({
          error: "El partido ya tiene estadísticas (ya fue finalizado)",
        });
      }
      console.error(error);
      res.status(500).json({ error: "Error al finalizar el partido" });
    }
  }

  static async updatePartido(req, res) {
    try {
      const { id } = req.params;
      const { fecha, rival, competencia, hora, lugar } = req.body;
      const partido = await prisma.partido.update({
        where: { id: parseInt(id) },
        data: { fecha: new Date(fecha), rival, competencia, hora, lugar },
      });
      res.json(partido);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el partido" });
    }
  }
  static async deletePartido(req, res) {
    try {
      const { id } = req.params;
      const partido = await prisma.partido.delete({
        where: { id: parseInt(id) },
      });
      res.send("Partido eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el partido" });
    }
  }
}
