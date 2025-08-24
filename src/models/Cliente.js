import { DataTypes, Model } from "sequelize";

class Cliente extends Model {
    static initModel(sequelize) {
        Cliente.init({
            id_cliente: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: DataTypes.STRING(80), allowNull: false},
            apellido: {type: DataTypes.STRING(80), allowNull: false},
            telefono: {type: DataTypes.STRING(30)},
            email: {type: DataTypes.STRING(120)}
        }, {sequelize, modelName: "Cliente", tableName: "cliente", timestamps: false});
        return Cliente;
    }
}

export default Cliente;