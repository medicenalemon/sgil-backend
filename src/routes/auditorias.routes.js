import { Router } from "express";
import { listarAuditoria } from "../controllers/auditorias.controller.js";
import { verifyToken } from "../auth/jwt.js";
import { requireRole } from "../auth/requireRole.js";

const r = Router();
r.get("/", verifyToken, requireRole("Administrador", "Encargado"), listarAuditoria);

export default r;