// auth.routes.js
import { Router } from "express";

// Creo una instancia de Router
const router = Router();

import { login } from "../controllers/auth.controller.js";
router.post("/login", login);
export default router;