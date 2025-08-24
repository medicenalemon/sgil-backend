import { DataTypes, Model } from "sequelize";

class Producto extends Model {
    static initModel(sequelize){
        Producto.init({
            id_producto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            nombre: { type: DataTypes.STRING(120), allowNull: false },
            descripcion: { type: DataTypes.TEXT },
            precio_unitario: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
            stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            id_categoria: { type: DataTypes.INTEGER, allowNull: false },
            id_proveedor: { type: DataTypes.INTEGER, allowNull: false },
            id_ubicacion: { type: DataTypes.INTEGER, allowNull: true }
        }, { sequelize, modelName: "Producto", tableName: "producto", timestamps: false });
        return Producto;
    }
}

export default Producto;