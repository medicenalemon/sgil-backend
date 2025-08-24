import sequelize from "../db.js";
import models from "../models/index.js";
import { logAction } from "../utils/logAction.js";

const { Compra, DetalleCompra, Producto, MovimientoStock, Proveedor } = models;
export const crearCompra = async (req, res) => {
    const { id_proveedor, items } = req.body;
    const id_usuario = req.user.id;
    const t = await sequelize.transaction();
    try {
        const compra = await Compra.create({ id_proveedor, total: 0, fecha: new Date() }, { transaction: t });
        let total = 0;
        for (const it of items){
            const prod = await Producto.findByPk(it.id_producto, { transaction: t, lock: t.LOCK.UPDATE });
            if (!prod) throw new Error(`Producto no encontrado con el ID ${it.id_producto}`);
            total += Number(it.precio_unitario) * Number(it.cantidad);
            await DetalleCompra.create({ id_compra: compra.id_compra, ...it }, { transaction: t });
            await prod.update({ stock: prod.stock + it.cantidad }, { transaction: t });
            await MovimientoStock.create(
                { id_producto: prod.id_producto, tipo: "entrada", cantidad: it.cantidad, motivo: `Compra ${compra.id_compra}` },
                { transaction: t }
            );
        }
        await compra.update({ total }, { transaction: t });
        await t.commit();
        await logAction(id_usuario, `Registró una compra al proveedor número ${id_proveedor}`);
        res.status(201).json(compra);
    } catch (e) {
        await t.rollback();
        res.status(400).json({ message: e.message });
    }
};

export const listarCompras = async (req, res) => {
    try {
        const compras = await Compra.findAll({
            include: [
                { model: Proveedor, attributes: ["id_proveedor", "nombre", "email"] },
                {
                    model: DetalleCompra,
                    include: [{ model: Producto, attributes: ["id_producto", "nombre", "precio_unitario"] }]
                }
            ],
            order: [["fecha", "DESC"]]
        });
        res.json(compras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};