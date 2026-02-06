import { prisma } from "../libs/prisma.js";

export class JugadoresController {
  static async createJugador(req, res) {
    try {
      const {
        nombre,
        segundo_nombre,
        apellido,
        segundo_apellido,
        fecha_nacimiento,
        documento_identidad,
        genero,
        pie_dominante,
        posicion,
      } = req.body;

      const jugador = await prisma.jugador.create({
        data: {
          nombre,
          segundo_nombre,
          apellido,
          segundo_apellido,
          fecha_nacimiento: new Date(fecha_nacimiento),
          documento_identidad,
          pie_dominante,
          posicion,
          genero,
        },
      });
      res.json(jugador);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al crear el jugador" });
    }
  }

  static async getAllJugadores(req, res) {
    try {
      const jugadores = await prisma.jugador.findMany();
      res.json(jugadores);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los jugadores" });
    }
  }

  static async getJugadorById(req, res) {
    try {
      const { id } = req.params;
      const jugador = await prisma.jugador.findUnique({
        where: { id: parseInt(id) },
      });
      if (!jugador) {
        return res.status(404).json({ error: "Jugador no encontrado" });
      }
      res.json(jugador);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el jugador" });
    }
  }

  static async updateJugador(req, res) {
    try {
      const { id } = req.params;
      const {
        nombre,
        segundo_nombre,
        apellido,
        segundo_apellido,
        fecha_nacimiento,
        documento_identidad,
        genero,
        pie_dominante,
        posicion,
      } = req.body;

      const jugador = await prisma.jugador.update({
        where: { id: parseInt(id) },
        data: {
          nombre,
          segundo_nombre,
          apellido,
          segundo_apellido,
          fecha_nacimiento: fecha_nacimiento
            ? new Date(fecha_nacimiento)
            : undefined,
          documento_identidad,
          pie_dominante,
          posicion,
          genero,
        },
      });
      res.json(jugador);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al actualizar el jugador" });
    }
  }

  static async deleteJugador(req, res) {
    try {
      const { id } = req.params;
      const jugador = await prisma.jugador.delete({
        where: { id: parseInt(id) },
      });
      res.send("Jugador eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el jugador" });
    }
  }
}
