import { sequelize } from "../config/initDB"; // Asegúrate de importar tu instancia de Sequelize
import { ClientModel } from "../models/ClientModel";

export class ClientRepository {
    // Buscar usuario por ID
    static async findById(id: number) {
        return await ClientModel.findByPk(id);
    }

    // Obtener todos los usuarios
    static async findAll() {
        return await ClientModel.findAll();
    }

    // Crear un nuevo usuario
    static async create(userData: any) {
        return await ClientModel.create(userData);
    }

    // Actualizar usuario por ID
    static async update(id: number, Data: any) {
        const client = await ClientModel.findByPk(id);
        if (!client) return null;
        return await client.update(Data);
    }

    // Eliminar usuario por ID
    static async delete(id: number) {
        const client = await ClientModel.findByPk(id);
        if (!client) return null;
        await client.destroy();
        return client;
    }

    // Buscar usuario por código de usuario
    static async findByClientCode(client_code: string) {
        return await ClientModel.findOne({ where: { client_code: client_code } });
    }

    // Buscar usuario por email
    static async findByEmail(email: string) {
        return await ClientModel.findOne({ where: { email } });
    }

    // Buscar usuario por nombre de usuario
    static async findByClientname(name: string) {
        return await ClientModel.findOne({ where: { name: name } });
    }
    // Buscar usuario por nombre de usuario
    static async findByClientnif(nif: string) {
        return await ClientModel.findOne({ where: { nif } });
    }
   
}
