import { body } from "express-validator";

export const lesionCreateValidator = [
  body("jugadorId")
    .isInt()
    .withMessage("El ID del jugador debe ser un número entero"),
  body("partidoId")
    .optional()
    .custom(
      (v) =>
        v === "" || v === null || v === undefined || Number.isInteger(Number(v))
    )
    .withMessage("El ID del partido debe ser un número entero"),
  body("gravedad").notEmpty().withMessage("La gravedad es requerida"),
  body("descripcion").notEmpty().withMessage("La descripción es requerida"),
];

export const lesionUpdateValidator = [
  body("jugadorId")
    .optional()
    .isInt()
    .withMessage("El ID del jugador debe ser un número entero"),
  body("partidoId")
    .optional()
    .custom(
      (v) =>
        v === "" || v === null || v === undefined || Number.isInteger(Number(v))
    )
    .withMessage("El ID del partido debe ser un número entero"),
  body("gravedad")
    .optional()
    .notEmpty()
    .withMessage("La gravedad no puede estar vacía"),
  body("descripcion")
    .optional()
    .notEmpty()
    .withMessage("La descripción no puede estar vacía"),
  body("estaActiva")
    .optional()
    .isBoolean()
    .withMessage("estaActiva debe ser true o false"),
];
