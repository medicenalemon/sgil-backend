import { DataTypes, Model } from "sequelize";

class Proveedor extends Model {
    static initModel(sequelize){
        Proveedor.init({
            id_proveedor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nombre: { type: DataTypes.STRING(120), allowNull: false },
            contacto: { type: DataTypes.STRING(120)},
            email: { type: DataTypes.STRING(120)},
            cuit: { type: DataTypes.STRING(20)}
        }, { sequelize, modelName: "Proveedor", tableName: "proveedor", timestamps: false });
        return Proveedor;
    }
}

export default Proveedor;