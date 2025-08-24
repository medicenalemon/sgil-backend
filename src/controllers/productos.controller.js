import models from "../models/index.js";

const { Producto, Categoria, Proveedor, UbicacionProducto, MovimientoStock } = models;

export const listar = async (req, res) => {
    const data = await Producto.findAll({ include: [Categoria, Proveedor, UbicacionProducto] });
    res.json(data);
}

export const crear = async (req, res) => {
    const p = await Producto.create(req.body);
    res.status(201).json(p);
}

export const actualizar = async (req, res) => {
    const { id } = req.params;
    await Producto.update(req.body, { where: { id_producto: id } });
    const actualizado = await Producto.findByPk(id);
    res.json(actualizado);
}

export const eliminar = async (req, res) => {
    const { id } = req.params;
    const movs = await MovimientoStock.count({ where: { id_producto: id }});
    if (movs > 0) return res.status(400).json({ message: "No se puede eliminar el producto. Tiene movimientos registrados"});
    await Producto.destroy({ where: { id_producto: id }});
    res.status(204).send();
}