import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import healthRoutes from "./routes/health.routes.js";
import comprasRoutes from "./routes/compras.routes.js";
import devolucionesRoutes from "./routes/devoluciones.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";
import auditoriasRoutes from "./routes/auditorias.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/compras", comprasRoutes);
app.use("/api/devoluciones", devolucionesRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/auditorias", auditoriasRoutes);

export default app;