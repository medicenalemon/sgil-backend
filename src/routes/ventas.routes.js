import { Router } from "express";
import { crearVenta, listarVentas } from "../controllers/ventas.controller.js";
import { verifyToken } from "../auth/jwt.js";
import { requireRole } from "../auth/requireRole.js";

const r = Router();
r.post("/", verifyToken, requireRole("Administrador", "Encargado", "Vendedor"), crearVenta);
r.get("/", verifyToken, requireRole("Administrador", "Encargado", "Vendedor"), listarVentas);

export default r;