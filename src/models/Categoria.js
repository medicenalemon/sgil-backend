import { DataTypes, Model } from "sequelize";

class Categoria extends Model {
    static initModel(sequelize) {
        Categoria.init({
            id_categoria: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            nombre: {type: DataTypes.STRING(80), allowNull: false},
            descripcion: {type: DataTypes.TEXT}
        }, {sequelize, modelName: "Categoria", tableName: "categoria", timestamps: false});
        return Categoria;
    }
}

export default Categoria;