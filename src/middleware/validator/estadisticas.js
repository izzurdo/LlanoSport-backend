import { body } from "express-validator";

export const estadisticaCreateValidator = [
  body("jugadorId")
    .isInt()
    .withMessage("El ID del jugador debe ser un número entero"),
  body("partidoId")
    .isInt()
    .withMessage("El ID del partido debe ser un número entero"),
  body("goles")
    .isInt({ min: 0 })
    .withMessage("Los goles deben ser un número entero mayor o igual a 0"),
  body("asistencias")
    .isInt({ min: 0 })
    .withMessage(
      "Las asistencias deben ser un número entero mayor o igual a 0"
    ),
  body("minutosJugados")
    .isInt({ min: 0 })
    .withMessage(
      "Los minutos jugados deben ser un número entero mayor o igual a 0"
    ),
  body("tarjetaAmarilla")
    .isInt({ min: 0 })
    .withMessage(
      "La cantidad de tarjetas amarillas debe ser un número entero mayor o igual a 0"
    ),
  body("tarjetaRoja")
    .isInt({ min: 0 })
    .withMessage(
      "La cantidad de tarjetas rojas debe ser un número entero mayor o igual a 0"
    ),
];

/** Solo campos de estadística; todos opcionales para PATCH/PUT parcial */
export const estadisticaUpdateValidator = [
  body("goles")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Los goles deben ser un número entero mayor o igual a 0"),
  body("asistencias")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Las asistencias deben ser un número entero mayor o igual a 0"
    ),
  body("minutosJugados")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "Los minutos jugados deben ser un número entero mayor o igual a 0"
    ),
  body("tarjetaAmarilla")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "La cantidad de tarjetas amarillas debe ser un número entero mayor o igual a 0"
    ),
  body("tarjetaRoja")
    .optional()
    .isInt({ min: 0 })
    .withMessage(
      "La cantidad de tarjetas rojas debe ser un número entero mayor o igual a 0"
    ),
];
