import { DataTypes, Model } from "sequelize";

class DetalleVenta extends Model {
    static initModel(sequelize){
        DetalleVenta.init({
            id_detalle: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            id_venta: { type: DataTypes.INTEGER, allowNull: false },
            id_producto: { type: DataTypes.INTEGER, allowNull: false },
            cantidad: { type: DataTypes.INTEGER, allowNull: false },
            precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
        }, { sequelize, modelName: "DetalleVenta", tableName: "detalle_venta", timestamps: false });
        return DetalleVenta;
    }
}

export default DetalleVenta;