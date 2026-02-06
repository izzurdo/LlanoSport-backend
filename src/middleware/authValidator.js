import { body } from "express-validator";

export const authValidator = [
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 6 characters long"),
];

export const updateEmailValidator = [
  body("email")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),
];

export const updatePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("La contraseña actual es requerida"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("La nueva contraseña debe tener al menos 6 caracteres"),
];
