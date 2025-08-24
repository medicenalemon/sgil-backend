import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Necesario en ESModules para resolver la ruta
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar el .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Variables de entorno cargadas:");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", typeof process.env.DB_PASS, process.env.DB_PASS ? "****" : "(vacío)");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false
    }
);

export default sequelize;

/*import "./models/index.js";

if(process.argv.includes("--sync")) {
    (async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ alter: true });
            console.log("Base de datos sincronizada con éxito");
            process.exit(0);
        } catch (e) {
            console.error("Error al sincronizar base de datos");
            process.exit(1);
        }
    })();
}*/