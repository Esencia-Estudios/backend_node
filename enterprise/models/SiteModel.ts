import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/initDB";

export class SiteModel extends Model {
  public id!: number;
  public name!: string;
  public address!: string | null;
  public city!: string | null;
  public country!: string | null;
  public country_short!: string | null;
  public cdp!: string | null;
  public lat!: number | null;
  public long!: number | null;
  public radius!: number | null;
  public obs!: string | null;
}

SiteModel.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_short: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cdp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    long: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    radius: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    obs: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Site",
    tableName: "erp_sites",
    timestamps: true,
  }
);
