import { body } from "express-validator";

export const convocatoriaAddValidator = [
  body("jugadorId")
    .isInt()
    .withMessage("El ID del jugador debe ser un número entero")
    .toInt(),
  body("esTitular")
    .optional()
    .isBoolean()
    .withMessage("esTitular debe ser true o false"),
  body("dorsal")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El dorsal debe ser un número entero mayor o igual a 0")
    .toInt(),
];

export const convocatoriaUpdateValidator = [
  body("esTitular")
    .optional()
    .isBoolean()
    .withMessage("esTitular debe ser true o false"),
  body("dorsal")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage("El dorsal debe ser un número entero mayor o igual a 0"),
];
