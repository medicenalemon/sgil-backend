import { Router } from "express";
import { ventasPorPeriodo, productosMasVendidos, clientesFrecuentes, stockBajo, comprasPorProveedor } from "../controllers/reportes.controller.js";
import { verifyToken } from "../auth/jwt.js";
import { requireRole } from "../auth/requireRole.js";

const r = Router();
r.get("/ventas", verifyToken, requireRole("Administrador", "Encargado"), ventasPorPeriodo);
r.get("/productos-mas-vendidos", verifyToken, requireRole("Administrador", "Encargado"), productosMasVendidos);
r.get("/clientes-frecuentes", verifyToken, requireRole("Administrador", "Encargado"), clientesFrecuentes);
r.get("/stock-bajo", verifyToken, requireRole("Administrador", "Encargado"), stockBajo);
r.get("/compras-proveedor", verifyToken, requireRole("Administrador", "Encargado"), comprasPorProveedor);

export default r;
