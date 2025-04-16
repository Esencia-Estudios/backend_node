import { getUsersService } from "@/services/userService";
import { ResponseHelper } from "@/helpers/response";

export const getUsers = async () => {
  try {
    const users = await getUsersService();
    return ResponseHelper.success(users);
  } catch (error: any) {
    return ResponseHelper.handleError(error);
  }
};
