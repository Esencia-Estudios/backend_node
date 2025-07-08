import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/initDB";

export class ClientModel extends Model {
  public id!: number;
  public name!: string;
  public nif!: string;
  public email!: string;
}

ClientModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nif: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "erp_clients",
    timestamps: true,
  }
);
