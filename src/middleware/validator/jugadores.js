import { body } from "express-validator";

export const jugadorCreateValidator = [
  body("nombre").isString().withMessage("El nombre debe ser un string"),
  body("segundo_nombre")
    .optional()
    .isString()
    .withMessage("El segundo nombre debe ser un string"),
  body("apellido").isString().withMessage("El apellido debe ser un string"),
  body("segundo_apellido")
    .optional()
    .isString()
    .withMessage("El segundo apellido debe ser un string"),
  body("fecha_nacimiento")
    .isISO8601()
    .withMessage("La fecha de nacimiento debe ser un objeto ISO8601"),
  body("documento_identidad")
    .isString()
    .withMessage(
      "El documento de identidad debe ser un string y debe ser unico",
    )
    .isLength({ min: 8, max: 10 })
    .withMessage(
      "El documento de identidad debe tener entre 8 y 10 caracteres",
    ),
  body("posicion").isString().withMessage("La posición debe ser un string"),
  body("pie_dominante")
    .isString()
    .withMessage("El pie dominante debe ser un string"),
  body("genero").isString().withMessage("El genero debe ser un string"),
];
