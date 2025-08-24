import models from "../models/index.js";

const { RegistroAuditoria } = models;
export const listarAuditoria = async (req, res) => {
    try {
        const registros = await RegistroAuditoria.findAll({
            order: [["fecha", "DESC"]],
            limit: 50
        });
        res.json(registros);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}