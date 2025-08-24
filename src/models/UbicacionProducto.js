import { DataTypes, Model } from "sequelize";

class UbicacionProducto extends Model {
    static initModel(sequelize){
        UbicacionProducto.init({
            id_ubicacion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nombre: { type: DataTypes.STRING(80), allowNull: false },
            descripcion: { type: DataTypes.TEXT }
        }, { sequelize, modelName: "UbicacionProducto", tableName: "ubicacion_producto", timestamps: false });
        return UbicacionProducto;
    }
}

export default UbicacionProducto;