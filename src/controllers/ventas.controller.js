import sequelize  from "../db.js";
import models from "../models/index.js"
import { logAction } from "../utils/logAction.js";

const { Venta, DetalleVenta, Cliente, Producto, MovimientoStock } = models;

export const crearVenta = async(req, res) => {
    const { id_cliente, forma_pago, items } = req.body;
    const id_usuario = req.user.id;
    const t = await sequelize.transaction();
    try {
        const venta = await Venta.create({ id_cliente, forma_pago, total:0 },{ transaction: t });
        let total = 0;
        for (const it of items){
            const prod = await Producto.findByPk(it.id_producto, { transaction: t, lock: t.LOCK.UPDATE });
            if (!prod || prod.stock < it.cantidad) throw new Error(`Stock insuficiente para producto ${it.id_producto}`);
            total += Number(it.precio_unitario) * Number(it.cantidad);
            await DetalleVenta.create({ id_venta: venta.id_venta, ...it }, { transaction: t });
            await prod.update({ stock: prod.stock - it.cantidad }, { transaction: t });
            await MovimientoStock.create(
                { id_producto: prod.id_producto, tipo: "salida", cantidad: it.cantidad, motivo: `Venta ${venta.id_venta}`},
                { transaction: t }
            );
        }
        await venta.update({ total }, { transaction: t });
        await t.commit();
        await logAction(id_usuario, `Creó una venta para el cliente número ${id_cliente}`);
        res.status(201).json(venta);
    } catch (e) {
        await t.rollback();
        res.status(400).json({ message: e.message });
    }
}

export const listarVentas = async (req, res) => {
    try {
        // 🔍 Debug: mostramos los modelos que tenemos disponibles
        console.log("Modelos cargados:", Object.keys(models));

        // También podemos mostrar específicamente si Cliente existe
        console.log("Cliente:", Cliente ? "OK" : "NO DEFINIDO");
        console.log("Producto:", Producto ? "OK" : "NO DEFINIDO");

        const ventas = await Venta.findAll({
            include: [
                { model: Cliente, attributes: ["id_cliente", "nombre", "apellido"] },
                {
                    model: DetalleVenta,
                    include: [{ model: Producto, attributes: ["id_producto", "nombre", "precio_unitario"] }]
                }
            ],
            order: [["fecha", "DESC"]]
        });

        res.json(ventas);
    } catch (error) {
        console.error("Error en listarVentas:", error.message);
        res.status(500).json({ message: error.message });
    }
};
