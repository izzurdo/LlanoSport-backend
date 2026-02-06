import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { PartidosController } from "../controllers/partidos.controller.js";
import { ConvocatoriasController } from "../controllers/convocatorias.controller.js";
import { handleInputErrors } from "../middleware/handleInputErrors.js";
import {
  partidoCreateValidator,
  partidoFinalizarValidator,
} from "../middleware/validator/partidos.js";
import {
  convocatoriaAddValidator,
  convocatoriaUpdateValidator,
} from "../middleware/validator/convocatorias.js";
import { param } from "express-validator";

const router = Router();
router.use(authenticate);

const idParam = param("id")
  .isInt()
  .withMessage("El ID debe ser un número entero")
  .toInt();
const jugadorIdParam = param("jugadorId")
  .isInt()
  .withMessage("El ID del jugador debe ser un número entero")
  .toInt();

// Partidos CRUD
router.post(
  "/",
  partidoCreateValidator,
  handleInputErrors,
  PartidosController.createPartido
);
router.get("/", PartidosController.getPartidos);

// Convocados (anidado en partido; rutas antes de /:id)
router.get(
  "/:id/convocados",
  idParam,
  handleInputErrors,
  ConvocatoriasController.getConvocadosByPartido
);
router.post(
  "/:id/convocados",
  idParam,
  convocatoriaAddValidator,
  handleInputErrors,
  ConvocatoriasController.addConvocado
);
router.delete(
  "/:id/convocados/:jugadorId",
  idParam,
  jugadorIdParam,
  handleInputErrors,
  ConvocatoriasController.removeConvocado
);
router.put(
  "/:id/convocados/:jugadorId",
  idParam,
  jugadorIdParam,
  convocatoriaUpdateValidator,
  handleInputErrors,
  ConvocatoriasController.updateConvocado
);

// Finalizar partido (permite registrar estadísticas después)
router.patch(
  "/:id/finalizar",
  idParam,
  partidoFinalizarValidator,
  handleInputErrors,
  PartidosController.finalizarPartido
);

// Partido por ID y actualizar/eliminar
router.get(
  "/:id",
  idParam,
  handleInputErrors,
  PartidosController.getPartidoById
);
router.put(
  "/:id",
  idParam,
  partidoCreateValidator,
  handleInputErrors,
  PartidosController.updatePartido
);
router.delete(
  "/:id",
  idParam,
  handleInputErrors,
  PartidosController.deletePartido
);

export default router;
