import { DataTypes, Model } from "sequelize";

class DevolucionCompra extends Model {
    static initModel(sequelize){
        DevolucionCompra.init({
            id_devolucion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            id_detalle_compra: { type: DataTypes.INTEGER, allowNull: false },
            fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            motivo: { type: DataTypes.TEXT, allowNull: false }
        }, { sequelize, modelName: "DevolucionCompra", tableName: "devolucion_compra", timestamps: false });
        return DevolucionCompra;
    }
}

export default DevolucionCompra;