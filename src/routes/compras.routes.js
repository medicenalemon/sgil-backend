import { Router } from "express";
import { crearCompra, listarCompras } from "../controllers/compras.controller.js";
import { verifyToken } from "../auth/jwt.js";
import { requireRole } from "../auth/requireRole.js";

const r = Router();
r.post("/", verifyToken, requireRole("Administrador", "Encargado"), crearCompra);
r.get("/", verifyToken, requireRole("Administrador", "Encargado"), listarCompras);

export default r;