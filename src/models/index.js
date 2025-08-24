import sequelize  from "../db.js";
import Categoria from "./Categoria.js";
import Cliente from "./Cliente.js";
import Compra from "./Compra.js";
import DetalleCompra from "./DetalleCompra.js";
import DetalleVenta from "./DetalleVenta.js";
import DevolucionCompra from "./DevolucionCompra.js";
import DevolucionVenta from "./DevolucionVenta.js";
import MovimientoStock from "./MovimientoStock.js";
import Producto from "./Producto.js";
import Proveedor from "./Proveedor.js";
import RegistroAuditoria from "./RegistroAuditoria.js";
import RolUsuario from "./RolUsuario.js";
import UbicacionProducto from "./UbicacionProducto.js";
import Usuario from "./Usuario.js";
import Venta from "./Venta.js";

const models = {
    Categoria: Categoria.initModel(sequelize),
    Cliente: Cliente.initModel(sequelize),
    Compra: Compra.initModel(sequelize),
    DetalleCompra: DetalleCompra.initModel(sequelize),
    DetalleVenta: DetalleVenta.initModel(sequelize),
    DevolucionCompra: DevolucionCompra.initModel(sequelize),
    DevolucionVenta: DevolucionVenta.initModel(sequelize),
    MovimientoStock: MovimientoStock.initModel(sequelize),
    Producto: Producto.initModel(sequelize),
    Proveedor: Proveedor.initModel(sequelize),
    RegistroAuditoria: RegistroAuditoria.initModel(sequelize),
    RolUsuario: RolUsuario.initModel(sequelize),
    UbicacionProducto: UbicacionProducto.initModel(sequelize),
    Usuario: Usuario.initModel(sequelize),
    Venta: Venta.initModel(sequelize),
}

//PRODUCTOS.
models.Categoria.hasMany(models.Producto, { foreignKey: "id_categoria" });
models.Producto.belongsTo(models.Categoria, { foreignKey: "id_categoria"});

models.Proveedor.hasMany(models.Producto, { foreignKey: "id_proveedor" });
models.Producto.belongsTo(models.Proveedor, { foreignKey: "id_proveedor" });

models.UbicacionProducto.hasMany(models.Producto, { foreignKey: "id_ubicacion" });
models.Producto.belongsTo(models.UbicacionProducto, { foreignKey: "id_ubicacion" });

//COMPRAS.
models.Proveedor.hasMany(models.Compra, { foreignKey: "id_proveedor" });
models.Compra.belongsTo(models.Proveedor, { foreignKey: "id_proveedor" });

models.Compra.hasMany(models.DetalleCompra, { foreignKey: "id_compra" });
models.DetalleCompra.belongsTo(models.Compra, { foreignKey: "id_compra" });

models.Producto.hasMany(models.DetalleCompra, { foreignKey: "id_producto" });
models.DetalleCompra.belongsTo(models.Producto, { foreignKey: "id_producto" });

models.DetalleCompra.hasOne(models.DevolucionCompra, { foreignKey: "id_detalle_compra" });
models.DevolucionCompra.belongsTo(models.DetalleCompra, { foreignKey: "id_detalle_compra" });

//VENTAS.
models.Cliente.hasMany(models.Venta, { foreignKey: "id_cliente" });
models.Venta.belongsTo(models.Cliente, { foreignKey: "id_cliente" });

models.Venta.hasMany(models.DetalleVenta, { foreignKey: "id_venta" });
models.DetalleVenta.belongsTo(models.Venta, { foreignKey: "id_venta" });

models.Producto.hasMany(models.DetalleVenta, { foreignKey: "id_producto" });
models.DetalleVenta.belongsTo(models.Producto, { foreignKey: "id_producto" });

models.DetalleVenta.hasOne(models.DevolucionVenta, { foreignKey: "id_detalle" });
models.DevolucionVenta.belongsTo(models.DetalleVenta, { foreignKey: "id_detalle" });

//STOCK DE PRODUCTOS.
models.Producto.hasMany(models.MovimientoStock, { foreignKey: "id_producto" });
models.MovimientoStock.belongsTo(models.Producto, { foreignKey: "id_producto" });

//USUARIOS, ROLES Y AUDITORIAS.
models.RolUsuario.hasMany(Usuario, { foreignKey: "id_rol" });
models.Usuario.belongsTo(RolUsuario, { foreignKey: "id_rol" });

models.Usuario.hasMany(RegistroAuditoria, { foreignKey: "id_usuario" });
models.RegistroAuditoria.belongsTo(Usuario, { foreignKey: "id_usuario" });

export { sequelize };
export default models;