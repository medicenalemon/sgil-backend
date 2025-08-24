import { DataTypes, Model } from "sequelize";

class Venta extends Model {
    static initModel(sequelize){
        Venta.init({
            id_venta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            forma_pago: { type: DataTypes.STRING(40), allowNull: false },
            id_cliente: { type: DataTypes.INTEGER, allowNull: false }
        }, { sequelize, modelName: "Venta", tableName: "venta", timestamps: false });
        return Venta;
    }
}

export default Venta;