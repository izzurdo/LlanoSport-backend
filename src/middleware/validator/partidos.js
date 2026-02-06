import { body } from "express-validator";

export const partidoCreateValidator = [
  body("fecha").isISO8601().withMessage("La fecha debe ser un objeto ISO8601"),
  body("hora").isString().withMessage("La hora debe ser un string"),
  body("lugar").isString().withMessage("El lugar debe ser un string"),
  body("rival").isString().withMessage("El rival debe ser un string"),
  body("competencia")
    .isString()
    .withMessage("La competencia debe ser un string"),
];

export const partidoFinalizarValidator = [
  body("goles_a_favor")
    .optional()
    .isInt({ min: 0 })
    .withMessage("goles_a_favor debe ser un entero mayor o igual a 0")
    .toInt(),
  body("goles_en_contra")
    .optional()
    .isInt({ min: 0 })
    .withMessage("goles_en_contra debe ser un entero mayor o igual a 0")
    .toInt(),
];
