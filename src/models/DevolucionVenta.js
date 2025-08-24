import { DataTypes, Model } from "sequelize";

class DevolucionVenta extends Model {
    static initModel(sequelize){
        DevolucionVenta.init({
            id_devolucion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            id_detalle: { type: DataTypes.INTEGER, allowNull: false },
            fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            motivo: { type: DataTypes.TEXT, allowNull: false }
        }, { sequelize, modelName: "DevolucionVenta", tableName: "devolucion_venta", timestamps: false });
        return DevolucionVenta;
    }
}

export default DevolucionVenta;