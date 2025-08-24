import { DataTypes, Model } from "sequelize";

class Usuario extends Model {
    static initModel(sequelize){
        Usuario.init({
            id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nombre_usuario: { type: DataTypes.STRING(60), unique: true, allowNull: false },
            contrasena: { type: DataTypes.STRING(255), allowNull: false },
            id_rol: { type: DataTypes.INTEGER, allowNull: false }
        }, { sequelize, modelName: "Usuario", tableName: "usuario", timestamps: false });
        return Usuario;
    }
}

export default Usuario;