import { DepartamentModel } from "@/models/DepartamentModel";

export class DepartamentRepository {
  // Buscar Departamento por ID
  static async findById(id: number) {
    return await DepartamentModel.findByPk(id);
  }

  // Obtener todos los Departamentos
  static async findAll() {
    return await DepartamentModel.findAll();
  }

  // Crear nuevo Departamento
  static async create(data: Partial<DepartamentModel>) {
    return await DepartamentModel.create(data);
  }

  // Actualizar Departamento por ID
  static async update(id: number, data: Partial<DepartamentModel>) {
    const dep = await DepartamentModel.findByPk(id);
    if (!dep) return null;
    return await dep.update(data);
  }

  // Eliminar Departamento por ID
  static async delete(id: number) {
    const dep = await DepartamentModel.findByPk(id);
    if (!dep) return null;
    await dep.destroy();
    return dep;
  }

  // Buscar por nombre (único por site o empresa)
  static async findByName(nombre: string) {
    return await DepartamentModel.findOne({ where: { nombre } });
  }

  // Buscar por site
  static async findBySite(id_site: number) {
    return await DepartamentModel.findAll({ where: { id_site } });
  }

  // Buscar por empresa
  static async findByEnterprise(id_enterprise: number) {
    return await DepartamentModel.findAll({ where: { id_enterprise } });
  }

  // Buscar hijos de un departamento
  static async findChildren(id_dep_mother: number) {
    return await DepartamentModel.findAll({ where: { id_dep_mother } });
  }

  // Buscar departamentos de tráfico
  static async findTrafficDepartments() {
    return await DepartamentModel.findAll({ where: { is_traffic: true } });
  }

  // Buscar departamentos de almacén
  static async findStoreDepartments() {
    return await DepartamentModel.findAll({ where: { is_store: true } });
  }
}
