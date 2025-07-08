import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/initDB";

export class EnterpriseModel extends Model {
  public id!: number;
  public name!: string;
  public alias!: string;
  public nif!: string;
  public active!: boolean;
  public obs!: string;
  public id_organitation!: number;
  public id_enterprise_mother!: number;
}

EnterpriseModel.init(
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
    alias: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nif: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    obs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_organitation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_enterprise_mother: {
      // marca si pertenece a un grupo empresarial
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Enterprise",
    tableName: "erp_enterprises",
    timestamps: true,
  }
);
