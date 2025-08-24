import { DataTypes, Model } from "sequelize";

class MovimientoStock extends Model {
    static initModel(sequelize){
        MovimientoStock.init({
            id_movimiento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            id_producto: { type: DataTypes.INTEGER, allowNull: false },
            tipo: { type: DataTypes.ENUM("entrada","salida"), allowNull: false },
            cantidad: { type: DataTypes.INTEGER, allowNull: false },
            fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            motivo: { type: DataTypes.TEXT }
        }, { sequelize, modelName: "MovimientoStock", tableName: "movimiento_stock", timestamps: false });
        return MovimientoStock;
    }
}

export default MovimientoStock;