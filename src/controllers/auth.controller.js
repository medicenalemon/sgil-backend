import bcrypt from "bcryptjs";
import models from "../models/index.js";
import { signToken } from "../auth/jwt.js";
const { Usuario, RolUsuario } = models;

export const login = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    // --- PASO DE DEPURACIÓN 1 ---
    console.log("Intentando iniciar sesión con:", nombre_usuario);
    console.log("Contraseña recibida:", contrasena);

    const user = await Usuario.findOne({
        where: { nombre_usuario: nombre_usuario },
        include: RolUsuario
    });

    // --- PASO DE DEPURACIÓN 2 ---
    // ¿Encontramos un usuario?
    if (!user) {
        console.log("RESULTADO: Usuario no encontrado en la BD.");
        return res.status(401).json({ message: "Usuario no encontrado" });
    }

    // Si lo encontramos, ¿qué datos tiene?
    console.log("Usuario encontrado:", user.toJSON());
    console.log("Hash guardado en la BD:", user.contrasena);

    // Compara la contraseña del body con el hash de la BD
    const ok = await bcrypt.compare(contrasena, user.contrasena);

    // --- PASO DE DEPURACIÓN 3 ---
    console.log("Resultado de bcrypt.compare:", ok); // ok debe ser true

    if(!ok) return res.status(401).json({ message: "Credenciales incorrectas"});

    // Si todo va bien...
    const token = signToken({ id: user.id_usuario, rol: user.RolUsuario?.nombre || "Vendedor"});
    res.json(token);
}

/*export const login = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;
    const user = await Usuario.findOne({
        where: {
            nombre_usuario: nombre_usuario
        },
        include: RolUsuario
    });
    if(!user) return res.status(401).json({ message: "Usuario no encontrado" });

    const ok = await bcrypt.compare(contrasena, user.contrasena);
    if(!ok) return res.status(401).json({ message: "Credenciales incorrectas"});

    const token = signToken({ id: user.id_usuario, rol: user.RolUsuario?.nombre || "Vendedor"});
    res.json(token);
}*/