import { SiteModel } from "@/models/SiteModel";

export class SiteRepository {
  // Buscar Site por ID
  static async findById(id: number) {
    return await SiteModel.findByPk(id);
  }

  // Obtener todos los Sites
  static async findAll() {
    return await SiteModel.findAll();
  }

  // Crear nuevo Site
  static async create(data: Partial<SiteModel>) {
    return await SiteModel.create(data);
  }

  // Actualizar Site por ID
  static async update(id: number, data: Partial<SiteModel>) {
    const site = await SiteModel.findByPk(id);
    if (!site) return null;
    return await site.update(data);
  }

  // Eliminar Site por ID
  static async delete(id: number) {
    const site = await SiteModel.findByPk(id);
    if (!site) return null;
    await site.destroy();
    return site;
  }

  // Buscar por nombre (único)
  static async findByName(name: string) {
    return await SiteModel.findOne({ where: { name } });
  }

  // Buscar por ciudad
  static async findByCity(city: string) {
    return await SiteModel.findAll({ where: { city } });
  }

  // Buscar por país
  static async findByCountry(country: string) {
    return await SiteModel.findAll({ where: { country } });
  }
}
