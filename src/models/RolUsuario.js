import { DataTypes, Model } from "sequelize";

class RolUsuario extends Model {
    static initModel(sequelize){
        RolUsuario.init({
            id_rol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nombre: { type: DataTypes.STRING(40), allowNull: false }
        }, { sequelize, modelName: "RolUsuario", tableName: "rol_usuario", timestamps: false });
        return RolUsuario;
    }
}

export default RolUsuario;