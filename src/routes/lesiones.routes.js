import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { LesionesController } from "../controllers/lesiones.controller.js";
import { handleInputErrors } from "../middleware/handleInputErrors.js";
import {
  lesionCreateValidator,
  lesionUpdateValidator,
} from "../middleware/validator/lesiones.js";
import { param } from "express-validator";

const router = Router();
router.use(authenticate);
router.post(
  "/",
  lesionCreateValidator,
  handleInputErrors,
  LesionesController.createLesion
);
router.get("/", LesionesController.getLesiones);
router.get(
  "/jugador/:jugadorId",
  param("jugadorId")
    .isInt()
    .withMessage("El ID del jugador debe ser un número entero")
    .toInt(),
  handleInputErrors,
  LesionesController.getLesionesByJugador
);
router.get(
  "/:id",
  param("id").isInt().withMessage("El ID debe ser un número entero").toInt(),
  handleInputErrors,
  LesionesController.getLesionById
);
router.put(
  "/:id",
  param("id").isInt().withMessage("El ID debe ser un número entero").toInt(),
  lesionUpdateValidator,
  handleInputErrors,
  LesionesController.updateLesion
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("El ID debe ser un número entero").toInt(),
  handleInputErrors,
  LesionesController.deleteLesion
);

export default router;
