import models from "../models/index.js";

const { RegistroAuditoria } = models;
export const logAction = async (id_usuario, accion) => {
    try {
        await RegistroAuditoria.create({
            id_usuario,
            accion,
            fecha: new Date()
        });
    } catch (e) {
        console.error("Error al registrar acción en el registro de auditorías: ", e.message);
    }
}