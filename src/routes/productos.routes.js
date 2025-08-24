import { Router } from "express";
import { listar, crear, eliminar, actualizar } from "../controllers/productos.controller.js";
import { verifyToken } from "../auth/jwt.js";
import { requireRole } from "../auth/requireRole.js";

const r = Router();
r.get("/", verifyToken, listar);
r.post("/", verifyToken, requireRole("Administrador", "Encargado"), crear);
r.put("/:id", verifyToken, requireRole("Administrador", "Encargado"), actualizar);
r.delete("/:id", verifyToken, requireRole("Administrador"), eliminar);

export default r;