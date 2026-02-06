import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { EstadisticasController } from "../controllers/estadisticas.controller.js";
import { handleInputErrors } from "../middleware/handleInputErrors.js";
import {
  estadisticaCreateValidator,
  estadisticaUpdateValidator,
} from "../middleware/validator/estadisticas.js";
import { param } from "express-validator";

const router = Router();
router.use(authenticate);
router.post(
  "/",
  estadisticaCreateValidator,
  handleInputErrors,
  EstadisticasController.createEstadistica
);
router.get("/", EstadisticasController.getEstadisticas);
router.get(
  "/partido/:partidoId",
  param("partidoId")
    .isInt()
    .withMessage("El ID del partido debe ser un número entero")
    .toInt(),
  handleInputErrors,
  EstadisticasController.getEstadisticasPartido
);
router.get(
  "/jugador/:jugadorId",
  param("jugadorId")
    .isInt()
    .withMessage("El ID del jugador debe ser un número entero")
    .toInt(),
  handleInputErrors,
  EstadisticasController.getEstadisticasByJugador
);
router.get(
  "/:id",
  param("id").isInt().withMessage("El ID debe ser un número entero").toInt(),
  handleInputErrors,
  EstadisticasController.getEstadisticaById
);
router.put(
  "/:id",
  param("id").isInt().withMessage("El ID debe ser un número entero").toInt(),
  estadisticaUpdateValidator,
  handleInputErrors,
  EstadisticasController.updateEstadistica
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("El ID debe ser un número entero").toInt(),
  handleInputErrors,
  EstadisticasController.deleteEstadistica
);

export default router;
