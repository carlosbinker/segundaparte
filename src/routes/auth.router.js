// auth.routes.js
import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

// Creo una instancia de Router
const router = Router();

router.post("/login", login);

export default router;