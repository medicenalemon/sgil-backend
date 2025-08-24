import sequelize from "../db.js";
import { QueryTypes } from "sequelize";

export const ventasPorPeriodo = async (req, res) => {
    const { inicio, fin } = req.query;
    const data = await sequelize.query(
        `SELECT v.id_venta, v.fecha, v.total, c.nombre || ' ' || c.apellido as cliente
         FROM venta v
         JOIN cliente c ON v.id_cliente = c.id_cliente
         WHERE v.fecha BETWEEN :inicio AND :fin
         ORDER BY v.fecha`,
        { replacements: { inicio, fin }, type: QueryTypes.SELECT }
    );
    res.json(data);
};

export const productosMasVendidos = async (req, res) => {
    const { limite = 5 } = req.query;
    const data = await sequelize.query(
        `SELECT p.nombre, SUM(dv.cantidad) as total_vendido
            FROM detalle_venta dv
            JOIN producto p ON dv.id_producto = p.id_producto
            GROUP BY p.id_producto
            ORDER BY total_vendido DESC
            LIMIT :limite`,
        { replacements: { limite: Number(limite) }, type: QueryTypes.SELECT }
    );
    res.json(data);
};

export const clientesFrecuentes = async (req, res) => {
    const data = await sequelize.query(
        `SELECT c.id_cliente, c.nombre || ' ' || c.apellido as cliente, COUNT(v.id_venta) as compras, SUM(v.total) as total_gastado
            FROM cliente c
            JOIN venta v ON v.id_cliente = c.id_cliente
            GROUP BY c.id_cliente
            ORDER BY total_gastado DESC`,
        { type: QueryTypes.SELECT }
    );
    res.json(data);
};

export const stockBajo = async (req, res) => {
    const { minimo = 5 } = req.query;
    const data = await sequelize.query(
        `SELECT p.nombre, p.stock
        FROM producto p
        WHERE p.stock < :minimo
        ORDER BY p.stock ASC`,
        { replacements: { minimo: Number(minimo) }, type: QueryTypes.SELECT }
    );
    res.json(data);
};

export const comprasPorProveedor = async (req, res) => {
    const { inicio, fin } = req.query;
    const data = await sequelize.query(
        `SELECT pr.nombre as proveedor, SUM(c.total) as total_compras
        FROM compra c
        JOIN proveedor pr ON c.id_proveedor = pr.id_proveedor
        WHERE c.fecha BETWEEN :inicio AND :fin
        GROUP BY pr.id_proveedor
        ORDER BY total_compras DESC`,
        { replacements: { inicio, fin }, type: QueryTypes.SELECT }
    );
    res.json(data);
}


