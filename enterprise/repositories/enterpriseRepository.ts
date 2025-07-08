import { sequelize } from "../config/initDB";
import { EnterpriseModel } from "@/models/EnterpriseModel";

export class EnterpriseRepository {
  // Buscar Enterprise por ID
  static async findById(id: number) {
    return await EnterpriseModel.findByPk(id);
  }

  // Obtener todas las Enterprises
  static async findAll() {
    return await EnterpriseModel.findAll();
  }

  // Crear nueva Enterprise
  static async create(data: Partial<EnterpriseModel>) {
    return await EnterpriseModel.create(data);
  }

  // Actualizar Enterprise por ID
  static async update(id: number, data: Partial<EnterpriseModel>) {
    const enterprise = await EnterpriseModel.findByPk(id);
    if (!enterprise) return null;
    return await enterprise.update(data);
  }

  // Eliminar Enterprise por ID
  static async delete(id: number) {
    const enterprise = await EnterpriseModel.findByPk(id);
    if (!enterprise) return null;
    await enterprise.destroy();
    return enterprise;
  }

  // Buscar por nombre (único)
  static async findByEnterprisename(name: string) {
    return await EnterpriseModel.findOne({ where: { name } });
  }

  // Buscar por NIF (único)
  static async findByEnterprisenif(nif: string) {
    return await EnterpriseModel.findOne({ where: { nif } });
  }

  // Buscar por alias (único)
  static async findByEnterpriseAlias(alias: string) {
    return await EnterpriseModel.findOne({ where: { alias } });
  }
}
