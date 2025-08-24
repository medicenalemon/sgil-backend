import { Router } from "express";
import { devolucionVenta, devolucionCompra, listarDevoluciones } from "../controllers/devoluciones.controller.js";
import { verifyToken } from "../auth/jwt.js";
import { requireRole } from "../auth/requireRole.js";

const r = Router();
r.post("/venta", verifyToken, requireRole("Administrador", "Encargado"), devolucionVenta);
r.post("/compra", verifyToken, requireRole("Administrador", "Encargado"), devolucionCompra);
r.get("/", verifyToken, requireRole("Administrador","Encargado"), listarDevoluciones);

export default r;