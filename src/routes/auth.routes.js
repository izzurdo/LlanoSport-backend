import { Router } from "express";
import {AuthController} from "../controllers/auth.controller.js";
import { authValidator, updateEmailValidator, updatePasswordValidator } from "../middleware/authValidator.js";
import { handleInputErrors } from "../middleware/handleInputErrors.js";
import { authenticate } from "../middleware/authenticate.js";
const router = Router();

router.post("/login", authValidator, handleInputErrors, AuthController.login);
router.get("/user", authenticate, AuthController.getUser);
router.put("/update-email", authenticate, updateEmailValidator, handleInputErrors, AuthController.updateEmail);
router.put("/update-password", authenticate, updatePasswordValidator, handleInputErrors, AuthController.updatePassword);

export default router;
