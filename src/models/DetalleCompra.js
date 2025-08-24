import { DataTypes, Model } from "sequelize";

class DetalleCompra extends Model {
    static initModel(sequelize){
        DetalleCompra.init({
            id_detalle_compra: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            id_compra: { type: DataTypes.INTEGER, allowNull: false },
            id_producto: { type: DataTypes.INTEGER, allowNull: false },
            cantidad: { type: DataTypes.INTEGER, allowNull: false },
            precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
        }, { sequelize, modelName: "DetalleCompra", tableName: "detalle_compra", timestamps: false });
        return DetalleCompra;
    }
}

export default DetalleCompra;