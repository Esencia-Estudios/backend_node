import {UserFields, UserModel} from "./User.js";
import { sequelize } from "../config/db.js";

const setupModels = () => {
    UserModel.init(UserFields, UserModel.config(sequelize));
}

setupModels()

export { UserModel }; 
export default sequelize.models