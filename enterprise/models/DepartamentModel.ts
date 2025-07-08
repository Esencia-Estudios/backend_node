import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/initDB";

export class DepartamentModel extends Model {
  public id!: number;
  public nombre!: string;
  public id_dep_mother!: number | null;
  public id_site!: number | null;
  public id_enterprise!: number | null;
  public obs!: string | null;
  public is_traffic!: boolean;
  public is_store!: boolean;
}

DepartamentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_dep_mother: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_site: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_enterprise: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    obs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_traffic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_store: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Departament",
    tableName: "erp_departaments",
    timestamps: true,
  }
);
