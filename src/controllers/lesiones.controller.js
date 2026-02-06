import { prisma } from "../libs/prisma.js";

export class LesionesController {
  static async createLesion(req, res) {
    try {
      const { jugadorId, partidoId, gravedad, descripcion } = req.body;

      const jugador = await prisma.jugador.findUnique({
        where: { id: parseInt(jugadorId) },
      });
      if (!jugador) {
        return res.status(404).json({ error: "Jugador no encontrado" });
      }

      let partidoIdFinal = null;
      if (partidoId != null && partidoId !== "") {
        const partido = await prisma.partido.findUnique({
          where: { id: parseInt(partidoId) },
        });
        if (!partido) {
          return res.status(404).json({ error: "Partido no encontrado" });
        }
        partidoIdFinal = partido.id;
      }

      const jugadorLesionActiva = await prisma.lesion.findFirst({
        where: {
          jugadorId: jugador.id,
          estaActiva: true,
        },
      });
      if (jugadorLesionActiva) {
        return res
          .status(400)
          .json({ error: "El jugador ya tiene una lesión activa" });
      }

      const lesion = await prisma.lesion.create({
        data: {
          jugadorId: jugador.id,
          partidoId: partidoIdFinal,
          gravedad: gravedad?.trim() ?? "",
          descripcion: descripcion?.trim() ?? "",
        },
        include: { jugador: true, partido: true },
      });
      res.json(lesion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear la lesión" });
    }
  }

  static async getLesiones(req, res) {
    try {
      const lesiones = await prisma.lesion.findMany({
        include: { jugador: true, partido: true },
        orderBy: { createdAt: "desc" },
      });
      res.json(lesiones);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las lesiones" });
    }
  }

  /**
   * GET /lesiones/jugador/:jugadorId
   * Historial de lesiones de un jugador.
   */
  static async getLesionesByJugador(req, res) {
    try {
      const { jugadorId } = req.params;
      const id = parseInt(jugadorId);

      const jugador = await prisma.jugador.findUnique({
        where: { id },
      });
      if (!jugador) {
        return res.status(404).json({ error: "Jugador no encontrado" });
      }

      const lesiones = await prisma.lesion.findMany({
        where: { jugadorId: id },
        include: { partido: true },
        orderBy: { createdAt: "desc" },
      });
      res.json(lesiones);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las lesiones del jugador" });
    }
  }

  static async getLesionById(req, res) {
    try {
      const { id } = req.params;
      const lesion = await prisma.lesion.findUnique({
        where: { id: parseInt(id) },
        include: { jugador: true, partido: true },
      });
      if (!lesion) {
        return res.status(404).json({ error: "Lesión no encontrada" });
      }
      res.json(lesion);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la lesión" });
    }
  }

  static async updateLesion(req, res) {
    try {
      const { id } = req.params;
      const { jugadorId, partidoId, gravedad, descripcion, estaActiva } =
        req.body;

      const existing = await prisma.lesion.findUnique({
        where: { id: parseInt(id) },
      });
      if (!existing) {
        return res.status(404).json({ error: "Lesión no encontrada" });
      }

      const data = {};
      if (jugadorId != null) data.jugadorId = parseInt(jugadorId);
      if (partidoId !== undefined)
        data.partidoId =
          partidoId === "" || partidoId == null ? null : parseInt(partidoId);
      if (gravedad !== undefined) data.gravedad = gravedad?.trim() ?? "";
      if (descripcion !== undefined)
        data.descripcion = descripcion?.trim() ?? "";
      if (typeof estaActiva === "boolean") data.estaActiva = estaActiva;

      const lesion = await prisma.lesion.update({
        where: { id: parseInt(id) },
        data,
        include: { jugador: true, partido: true },
      });
      res.json(lesion);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la lesión" });
    }
  }

  static async deleteLesion(req, res) {
    try {
      const { id } = req.params;
      const lesion = await prisma.lesion.findUnique({
        where: { id: parseInt(id) },
      });
      if (!lesion) {
        return res.status(404).json({ error: "Lesión no encontrada" });
      }
      await prisma.lesion.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "Lesión eliminada correctamente", lesion });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la lesión" });
    }
  }
}
