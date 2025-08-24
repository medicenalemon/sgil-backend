import sequelize from "../db.js";
import models from "../models/index.js";
import { logAction } from "../utils/logAction.js";

const { DevolucionVenta, DetalleVenta, Producto, MovimientoStock, DevolucionCompra, DetalleCompra, Cliente, Proveedor, Venta, Compra } = models;
export const devolucionVenta = async (req, res) => {
    const { id_detalle, cantidad, motivo } = req.body;
    const id_usuario = req.user.id;
    const t = await sequelize.transaction();
    try {
        const detalle = await DetalleVenta.findByPk(id_detalle, { transaction: t });
        if(!detalle) throw new Error("Detalle de venta no encontrado");
        if(cantidad > detalle.cantidad) throw new Error("La cantidad consignada es mayor a la vendida");
        const prod = await Producto.findByPk(detalle.id_producto, { transaction: t, lock: t.LOCK.UPDATE });
        await prod.update({ stock: prod.stock + cantidad }, { transaction: t });
        const dev = await DevolucionVenta.create({ id_detalle, cantidad, motivo }, { transaction: t });
        await MovimientoStock.create(
            { id_producto: prod.id_producto, tipo: "entrada", cantidad, motivo: `Devolución venta ${detalle.id_venta}` },
            { transaction: t }
        );
        await t.commit();
        await logAction(id_usuario, `Registró devolución de venta: Detalle N° ${id_detalle}, cantidad ${cantidad}`);
        res.status(201).json(dev);
    } catch (e) {
        await t.rollback();
        res.status(400).json({ message: e.message });
    }
};

export const devolucionCompra = async (req, res) => {
    const { id_detalle_compra, cantidad, motivo } = req.body;
    const id_usuario = req.user.id;
    const t = await sequelize.transaction();
    try {
        const detalle = await DetalleCompra.findByPk(id_detalle_compra, { transaction: t });
        if(!detalle) throw new Error("Detalle de compra no encontrado");
        if(cantidad > detalle.cantidad) throw new Error("La cantidad consignada es mayor a la comprada");
        const prod = await Producto.findByPk(detalle.id_producto, { transaction: t, lock: t.LOCK.UPDATE });
        if(prod.stock < cantidad) throw new Error("El stock es insuficiente para devolución");
        await prod.update({ stock: prod.stock - cantidad }, { transaction: t });
        const dev = await DevolucionCompra.create({ id_detalle_compra, cantidad, motivo }, { transaction: t });
        await MovimientoStock.create(
            { id_producto: prod.id_producto, tipo: "entrada", cantidad, motivo: `Devolución compra ${detalle.id_compra}` },
            { transaction: t }
        );
        await t.commit();
        await logAction(id_usuario, `Registró devolución de compra: Detalle N° ${id_detalle_compra}, cantidad ${cantidad}`);
        res.status(201).json(dev);
    } catch (e) {
        await t.rollback();
        res.status(400).json({ message: e.message });
    }
}

export const listarDevoluciones = async (req, res) => {
    try {
        // Devoluciones de ventas
        const devolucionesVenta = await DevolucionVenta.findAll({
            include: [
                {
                    model: DetalleVenta,
                    include: [
                        { model: Producto, attributes: ["id_producto", "nombre", "precio_unitario"] },
                        { model: Venta, include: [{ model: Cliente, attributes: ["id_cliente", "nombre", "apellido"] }] }
                    ]
                }
            ],
            order: [["fecha", "DESC"]]
        });

        // Devoluciones de compras
        const devolucionesCompra = await DevolucionCompra.findAll({
            include: [
                {
                    model: DetalleCompra,
                    include: [
                        { model: Producto, attributes: ["id_producto", "nombre", "precio_unitario"] },
                        { model: Compra, include: [{ model: Proveedor, attributes: ["id_proveedor", "nombre", "email"] }] }
                    ]
                }
            ],
            order: [["fecha", "DESC"]]
        });

        res.json({
            devolucionesVenta,
            devolucionesCompra
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};