import { DataTypes, Model } from "sequelize";

class RegistroAuditoria extends Model {
    static initModel(sequelize){
        RegistroAuditoria.init({
            id_registro_auditoria: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            id_usuario: { type: DataTypes.INTEGER, allowNull: false },
            accion: { type: DataTypes.TEXT, allowNull: false },
            fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
        }, { sequelize, modelName: "RegistroAuditoria", tableName: "registro_auditoria", timestamps: false });
        return RegistroAuditoria;
    }
}

export default RegistroAuditoria;