import dotenv from "dotenv";
dotenv.config();
import models, { sequelize } from "./models/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("🟢 Conectado con éxito a la base de datos PostgreSQL");
        app.listen(PORT, () => console.log(`🔵 Servidor SGIL escuchando en la dirección http://localhost:${PORT}`));
    } catch (e) {
        console.log("🔴 Error al establecer conexión con la base de datos", e);
        process.exit(1);
    }
})();