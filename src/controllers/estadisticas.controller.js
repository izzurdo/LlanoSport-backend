import { prisma } from "../libs/prisma.js";

export class EstadisticasController {
  /**
   * Registra la estadística de un jugador en un partido.
   * Requiere: partido finalizado y que el jugador esté convocado a ese partido.
   */
  static async createEstadistica(req, res) {
    try {
      const {
        jugadorId,
        partidoId,
        goles,
        asistencias,
        minutosJugados,
        tarjetaAmarilla,
        tarjetaRoja,
      } = req.body;

      const partido = await prisma.partido.findUnique({
        where: { id: partidoId },
        include: { estadisticasPartido: true },
      });

      if (!partido) {
        return res
          .status(404)
          .json({ error: "El partido especificado no existe" });
      }

      if (!partido.finalizado) {
        return res.status(400).json({
          error:
            "Solo se pueden registrar estadísticas cuando el partido está finalizado. Finaliza el partido primero.",
        });
      }

      const convocado = await prisma.convocatoria.findUnique({
        where: {
          partidoId_jugadorId: { partidoId, jugadorId },
        },
      });
      if (!convocado) {
        return res.status(400).json({
          error:
            "Solo se pueden registrar estadísticas de jugadores convocados a este partido. El jugador no está en la convocatoria.",
        });
      }

      const estadisticaPartido = partido.estadisticasPartido;
      if (!estadisticaPartido) {
        return res.status(500).json({
          error:
            "No existe el registro de estadísticas del partido. Debe finalizar el partido correctamente.",
        });
      }

      const estadisticaExistente =
        await prisma.estadisticaPartidoJugador.findUnique({
          where: {
            estadisticaPartidoId_jugadorId: {
              estadisticaPartidoId: estadisticaPartido.id,
              jugadorId,
            },
          },
        });

      if (estadisticaExistente) {
        return res.status(400).json({
          error:
            "Ya existe una estadística registrada para este jugador en este partido",
        });
      }

      const estadistica = await prisma.estadisticaPartidoJugador.create({
        data: {
          estadisticaPartidoId: estadisticaPartido.id,
          jugadorId,
          goles: goles ?? 0,
          asistencias: asistencias ?? 0,
          minutosJugados: minutosJugados ?? 0,
          tarjetaAmarilla: tarjetaAmarilla ?? 0,
          tarjetaRoja: tarjetaRoja ?? 0,
        },
      });

      res.status(201).json(estadistica);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la estadística" });
    }
  }

  static async getEstadisticas(req, res) {
    try {
      const estadisticas = await prisma.estadisticaPartidoJugador.findMany({
        include: {
          jugador: true,
          estadisticaPartido: {
            include: {
              partido: true,
            },
          },
        },
      });
      // Formato simplificado de respuesta
      const respuesta = estadisticas.map((e) => ({
        id: e.id,
        partido: {
          id: e.estadisticaPartido.partido.id,
          fecha: e.estadisticaPartido.partido.fecha,
          rival: e.estadisticaPartido.partido.rival,
          competencia: e.estadisticaPartido.partido.competencia,
        },
        jugador: {
          id: e.jugador.id,
          nombreCompleto: `${e.jugador.nombre} ${e.jugador.apellido}`.trim(),
          posicion: e.jugador.posicion,
        },
        estadistica: {
          goles: e.goles,
          asistencias: e.asistencias,
          minutosJugados: e.minutosJugados,
          tarjetasAmarillas: e.tarjetaAmarilla,
          tarjetasRojas: e.tarjetaRoja,
        },
      }));

      res.json(respuesta);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las estadísticas" });
    }
  }
  static async getEstadisticaById(req, res) {
    try {
      const { id } = req.params;
      const estadistica = await prisma.estadisticaPartidoJugador.findUnique({
        where: { id: parseInt(id) },
      });
      res.json(estadistica);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener la estadística" });
    }
  }

  /**
   * GET /estadisticas/jugador/:jugadorId
   * Estadísticas por partido de un jugador (historial de partidos jugados con stats).
   */
  static async getEstadisticasByJugador(req, res) {
    try {
      const { jugadorId } = req.params;
      const id = parseInt(jugadorId);

      const jugador = await prisma.jugador.findUnique({
        where: { id },
      });
      if (!jugador) {
        return res.status(404).json({ error: "Jugador no encontrado" });
      }

      const estadisticas = await prisma.estadisticaPartidoJugador.findMany({
        where: { jugadorId: id },
        include: {
          estadisticaPartido: {
            include: { partido: true },
          },
        },
        orderBy: {
          estadisticaPartido: {
            partido: { fecha: "desc" },
          },
        },
      });

      const lista = estadisticas.map((e) => {
        const partido = e.estadisticaPartido?.partido;
        return {
          id: e.id,
          partidoId: partido?.id,
          rival: partido?.rival ?? "—",
          competencia: partido?.competencia ?? "—",
          fecha: partido?.fecha,
          goles: e.goles,
          asistencias: e.asistencias,
          minutosJugados: e.minutosJugados,
          tarjetasAmarillas: e.tarjetaAmarilla,
          tarjetasRojas: e.tarjetaRoja,
        };
      });

      res.json(lista);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Error al obtener las estadísticas del jugador" });
    }
  }

  static async getEstadisticasPartido(req, res) {
    try {
      const { partidoId } = req.params;

      // Buscar la estadística de partido asociada al partido
      const estadisticaPartido = await prisma.estadisticaPartido.findUnique({
        where: { partidoId: parseInt(partidoId) },
      });

      if (!estadisticaPartido) {
        return res.status(404).json({
          error: "No hay estadísticas registradas para este partido",
        });
      }

      // Obtener todas las estadísticas individuales de ese partido
      const estadisticasJugadores =
        await prisma.estadisticaPartidoJugador.findMany({
          where: { estadisticaPartidoId: estadisticaPartido.id },
          include: {
            jugador: true,
          },
        });

      // Calcular totales agregados del partido
      const totales = estadisticasJugadores.reduce(
        (acc, e) => {
          acc.goles += e.goles;
          acc.asistencias += e.asistencias;
          acc.minutosJugados += e.minutosJugados;
          acc.tarjetasAmarillas += e.tarjetaAmarilla;
          acc.tarjetasRojas += e.tarjetaRoja;
          return acc;
        },
        {
          goles: 0,
          asistencias: 0,
          minutosJugados: 0,
          tarjetasAmarillas: 0,
          tarjetasRojas: 0,
        }
      );

      // Formato simplificado de jugadores (incluye id de la estadística para editar/eliminar)
      const jugadores = estadisticasJugadores.map((e) => ({
        id: e.id,
        jugadorId: e.jugador.id,
        nombreCompleto: `${e.jugador.nombre} ${e.jugador.apellido}`.trim(),
        posicion: e.jugador.posicion,
        goles: e.goles,
        asistencias: e.asistencias,
        minutosJugados: e.minutosJugados,
        tarjetasAmarillas: e.tarjetaAmarilla,
        tarjetasRojas: e.tarjetaRoja,
      }));

      return res.json({
        partidoId: estadisticaPartido.partidoId,
        resultadoPartido: {
          golesAFavor: estadisticaPartido.goles_a_favor,
          golesEnContra: estadisticaPartido.goles_en_contra,
        },
        totales,
        jugadores,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Error al obtener las estadísticas del partido" });
    }
  }
  /**
   * Actualiza solo los campos de estadística (goles, asistencias, etc.); no se puede cambiar jugador ni partido.
   */
  static async updateEstadistica(req, res) {
    try {
      const { id } = req.params;
      const {
        goles,
        asistencias,
        minutosJugados,
        tarjetaAmarilla,
        tarjetaRoja,
      } = req.body;

      const data = {};
      if (goles !== undefined) data.goles = goles;
      if (asistencias !== undefined) data.asistencias = asistencias;
      if (minutosJugados !== undefined) data.minutosJugados = minutosJugados;
      if (tarjetaAmarilla !== undefined) data.tarjetaAmarilla = tarjetaAmarilla;
      if (tarjetaRoja !== undefined) data.tarjetaRoja = tarjetaRoja;

      const estadistica = await prisma.estadisticaPartidoJugador.update({
        where: { id: parseInt(id) },
        data,
      });
      res.json(estadistica);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Estadística no encontrada" });
      }
      console.error(error);
      res.status(500).json({ error: "Error al actualizar la estadística" });
    }
  }
  static async deleteEstadistica(req, res) {
    try {
      const { id } = req.params;
      const estadistica = await prisma.estadisticaPartidoJugador.delete({
        where: { id: parseInt(id) },
      });
      res.send("Estadística eliminada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la estadística" });
    }
  }
}
