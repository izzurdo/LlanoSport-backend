import { prisma } from "../libs/prisma.js";

export class ConvocatoriasController {
  /**
   * GET /partidos/:id/convocados
   * Lista los jugadores convocados a un partido.
   */
  static async getConvocadosByPartido(req, res) {
    try {
      const partidoId = parseInt(req.params.id);
      const partido = await prisma.partido.findUnique({
        where: { id: partidoId },
      });
      if (!partido) {
        return res.status(404).json({ error: "Partido no encontrado" });
      }
      const convocados = await prisma.convocatoria.findMany({
        where: { partidoId },
        include: { jugador: true },
        orderBy: [{ esTitular: "desc" }, { dorsal: "asc" }],
      });
      return res.json(convocados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener los convocados" });
    }
  }

  /**
   * POST /partidos/:id/convocados
   * Agrega un jugador a la convocatoria del partido. Solo si el partido no está finalizado.
   */
  static async addConvocado(req, res) {
    try {
      const partidoId = parseInt(req.params.id);
      const { jugadorId, esTitular = false, dorsal } = req.body;

      const partido = await prisma.partido.findUnique({
        where: { id: partidoId },
      });
      if (!partido) {
        return res.status(404).json({ error: "Partido no encontrado" });
      }
      if (partido.finalizado) {
        return res.status(400).json({
          error:
            "No se pueden agregar convocados: el partido ya está finalizado",
        });
      }

      const jugador = await prisma.jugador.findUnique({
        where: { id: parseInt(jugadorId) },
      });
      if (!jugador) {
        return res.status(404).json({ error: "Jugador no encontrado" });
      }

      const convocatoria = await prisma.convocatoria.create({
        data: {
          partidoId,
          jugadorId: parseInt(jugadorId),
          esTitular: Boolean(esTitular),
          dorsal: dorsal != null ? parseInt(dorsal) : null,
        },
        include: { jugador: true },
      });
      return res.status(201).json(convocatoria);
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({
          error: "El jugador ya está convocado a este partido",
        });
      }
      console.error(error);
      return res.status(500).json({ error: "Error al agregar convocado" });
    }
  }

  /**
   * DELETE /partidos/:id/convocados/:jugadorId
   * Quita a un jugador de la convocatoria. Solo si el partido no está finalizado.
   */
  static async removeConvocado(req, res) {
    try {
      const partidoId = parseInt(req.params.id);
      const jugadorId = parseInt(req.params.jugadorId);

      const partido = await prisma.partido.findUnique({
        where: { id: partidoId },
      });
      if (!partido) {
        return res.status(404).json({ error: "Partido no encontrado" });
      }
      if (partido.finalizado) {
        return res.status(400).json({
          error:
            "No se pueden modificar convocados: el partido ya está finalizado",
        });
      }

      const convocatoria = await prisma.convocatoria.findUnique({
        where: {
          partidoId_jugadorId: { partidoId, jugadorId },
        },
      });
      if (!convocatoria) {
        return res.status(404).json({
          error: "El jugador no está convocado a este partido",
        });
      }

      await prisma.convocatoria.delete({
        where: { id: convocatoria.id },
      });
      return res.json({ message: "Convocado eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al eliminar convocado" });
    }
  }

  /**
   * PUT /partidos/:id/convocados/:jugadorId
   * Actualiza esTitular y/o dorsal de una convocatoria. Solo si el partido no está finalizado.
   */
  static async updateConvocado(req, res) {
    try {
      const partidoId = parseInt(req.params.id);
      const jugadorId = parseInt(req.params.jugadorId);
      const { esTitular, dorsal } = req.body;

      const partido = await prisma.partido.findUnique({
        where: { id: partidoId },
      });
      if (!partido) {
        return res.status(404).json({ error: "Partido no encontrado" });
      }
      if (partido.finalizado) {
        return res.status(400).json({
          error:
            "No se pueden modificar convocados: el partido ya está finalizado",
        });
      }

      const convocatoria = await prisma.convocatoria.update({
        where: {
          partidoId_jugadorId: { partidoId, jugadorId },
        },
        data: {
          ...(esTitular !== undefined && { esTitular: Boolean(esTitular) }),
          ...(dorsal !== undefined && {
            dorsal: dorsal === null || dorsal === "" ? null : parseInt(dorsal),
          }),
        },
        include: { jugador: true },
      });
      return res.json(convocatoria);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({
          error: "El jugador no está convocado a este partido",
        });
      }
      console.error(error);
      return res.status(500).json({ error: "Error al actualizar convocado" });
    }
  }
}
