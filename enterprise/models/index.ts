import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/initDB";

import { EnterpriseModel } from "./EnterpriseModel";
import { SiteModel } from "./SiteModel";
import { DepartamentModel } from "./DepartamentModel"; // 👈 importar modelo

const setupModels = (sequelize: Sequelize): void => {
  // Enterprise
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
      modelName: "Enterprise",
      tableName: "erp_enterprises",
      timestamps: true,
    }
  );

  // Site
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

  // Departament
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

  // Relaciones si necesitas (ejemplo):
  // DepartamentModel.belongsTo(SiteModel, { foreignKey: 'id_site' });
  // DepartamentModel.belongsTo(EnterpriseModel, { foreignKey: 'id_enterprise' });
  // DepartamentModel.belongsTo(DepartamentModel, { as: 'Mother', foreignKey: 'id_dep_mother' });
};

setupModels(sequelize);

export { EnterpriseModel, SiteModel, DepartamentModel };
export default sequelize.models;
