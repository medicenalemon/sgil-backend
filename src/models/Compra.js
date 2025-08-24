import { DataTypes, Model } from "sequelize";

class Compra extends Model {
    static initModel(sequelize){
        Compra.init({
            id_compra: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            total: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
            id_proveedor: { type: DataTypes.INTEGER, allowNull: false }
        }, { sequelize, modelName: "Compra", tableName: "compra", timestamps: false });
        return Compra;
    }
}

export default Compra;