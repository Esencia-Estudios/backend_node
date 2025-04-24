import { sequelize } from "../config/initDB"; // Asegúrate de importar tu instancia de Sequelize
import { UserModel } from "../models/UserModel";

export class UserRepository {
    // Buscar usuario por ID
    static async findById(id: number) {
        return await UserModel.findByPk(id);
    }

    // Obtener todos los usuarios
    static async findAll() {
        return await UserModel.findAll();
    }

    // Crear un nuevo usuario
    static async create(userData: any) {
        return await UserModel.create(userData);
    }

    // Actualizar usuario por ID
    static async update(id: number, userData: any) {
        const user = await UserModel.findByPk(id);
        if (!user) return null;
        return await user.update(userData);
    }

    // Eliminar usuario por ID
    static async delete(id: number) {
        const user = await UserModel.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    }

    // Buscar usuario por código de usuario
    static async findByUserCode(user_code: string) {
        return await UserModel.findOne({ where: { user_code } });
    }

    // Buscar usuario por email
    static async findByEmail(email: string) {
        return await UserModel.findOne({ where: { email } });
    }

    // Buscar usuario por nombre de usuario
    static async findByUsername(username: string) {
        return await UserModel.findOne({ where: { username } });
    }
}
