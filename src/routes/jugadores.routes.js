import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { JugadoresController } from "../controllers/jugadores.controller.js";
import { handleInputErrors } from "../middleware/handleInputErrors.js";
import { jugadorCreateValidator } from "../middleware/validator/jugadores.js";
import { param } from "express-validator";

const router = Router();
router.use(authenticate);
router.post(
  "/",
  jugadorCreateValidator,
  handleInputErrors,
  JugadoresController.createJugador,
);
router.get("/", JugadoresController.getAllJugadores);
router.get(
  "/:id",
  param("id").isInt(),
  handleInputErrors,
  JugadoresController.getJugadorById,
);
router.put(
  "/:id",
  jugadorCreateValidator,
  handleInputErrors,
  param("id").isInt(),
  JugadoresController.updateJugador,
);
router.delete(
  "/:id",
  param("id").isInt(),
  handleInputErrors,
  JugadoresController.deleteJugador,
);

export default router;
